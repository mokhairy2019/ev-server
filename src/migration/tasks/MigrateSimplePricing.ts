import PricingDefinition, { PricingEntity } from '../../types/Pricing';
import { PricingSettingsType, SimplePricingSetting } from '../../types/Setting';
import Tenant, { TenantComponents } from '../../types/Tenant';

import Constants from '../../utils/Constants';
import Logging from '../../utils/Logging';
import MigrationTask from '../MigrationTask';
import PricingStorage from '../../storage/mongodb/PricingStorage';
import { ServerAction } from '../../types/Server';
import SettingStorage from '../../storage/mongodb/SettingStorage';
import TenantStorage from '../../storage/mongodb/TenantStorage';
import Utils from '../../utils/Utils';

const MODULE_NAME = 'MigrateSimplePricing';

export default class SimplePricingMigrationTask extends MigrationTask {
  async migrate(): Promise<void> {
    const tenants = await TenantStorage.getTenants({}, Constants.DB_PARAMS_MAX_LIMIT);
    for (const tenant of tenants.result) {
      await this.migrateTenant(tenant);
    }
  }

  async migrateTenant(tenant: Tenant): Promise<void> {
    const pricingSetting = await SettingStorage.getSettingByIdentifier(tenant, TenantComponents.PRICING);
    if (pricingSetting?.content?.type === PricingSettingsType.SIMPLE) {
      await this.createDefaultPricingDefinition(tenant, pricingSetting.content.simple);
      await Logging.logDebug({
        tenantID: Constants.DEFAULT_TENANT,
        module: MODULE_NAME, method: 'migrateTenant',
        action: ServerAction.MIGRATION,
        message: `Simple pricing definition has been migrated for tenant ${Utils.buildTenantName(tenant)}`
      });
    }
  }

  getVersion(): string {
    return '1.0';
  }

  getName(): string {
    return 'SimplePricingMigrationTask';
  }

  isAsynchronous(): boolean {
    return true;
  }

  private async createDefaultPricingDefinition(tenant: Tenant, pricingSettings: SimplePricingSetting) {

    const pricingDefinition: PricingDefinition = {
      entityType: PricingEntity.TENANT,
      entityID: tenant.id,
      name: 'Main Tariff',
      description: 'Tariff generated by converting legacy pricing definitions',
      restrictions: null,
      dimensions: {
        energy: {
          active: true,
          price: pricingSettings.price,
        }
      }
    } as PricingDefinition;
    await PricingStorage.savePricingDefinition(tenant, pricingDefinition);
  }
}