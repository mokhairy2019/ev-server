import DynamicAuthorizationDataSource from '../authorization/DynamicAuthorizationDataSource';

export interface AuthorizationDefinition {
  superAdmin: AuthorizationDefinitionRole;
  admin: AuthorizationDefinitionRole;
  basic: AuthorizationDefinitionRole;
  demo: AuthorizationDefinitionRole;
  siteAdmin: AuthorizationDefinitionRole;
  siteOwner: AuthorizationDefinitionRole;
}
export interface AuthorizationDefinitionRole {
  grants: AuthorizationDefinitionGrant[];
  $extend?: Record<string, unknown>;
}

export interface AuthorizationDefinitionGrant {
  resource: Entity;
  action: Action | Action[];
  args?: Record<string, unknown>;
  condition?: AuthorizationDefinitionCondition;
  attributes?: string[];
}

export interface AuthorizationDefinitionCondition {
  Fn: string;
  args: AuthorizationDefinitionConditionArgs | AuthorizationDefinitionConditionArgs[] | AuthorizationDefinitionCondition[] | Record<string, unknown>;
}

export interface AuthorizationDefinitionConditionArgs {
  filters: string[];
  asserts: string[];
  metadata?: Record<string, AuthorizationDefinitionFieldMetadata>;
}

export interface AuthorizationDefinitionFieldMetadata {
  visible: boolean;
  enabled: boolean;
  mandatory: boolean;
  values: string[] | boolean[] | number[],
  defaultValue: string | boolean | number,
}

export interface AuthorizationResult {
  authorized: boolean;
  fields: string[];
  context: AuthorizationContext;
}

export interface AuthorizationFilter {
  filters: Record<string, any>;
  authorized: boolean;
  dataSources: Map<DynamicAuthorizationDataSourceName, DynamicAuthorizationDataSource<DynamicAuthorizationDataSourceData>>;
  projectFields: string[];
  metadata?: Record<string, AuthorizationDefinitionFieldMetadata>;
}

export interface Grant {
  resource: Entity;
  action: Action | Action[];
  attributes?: string[];
  args?: any;
  condition?: any;
}

export enum Entity {
  SITE = 'Site',
  SITE_AREA = 'SiteArea',
  COMPANY = 'Company',
  CHARGING_STATION = 'ChargingStation',
  CONNECTOR = 'Connector',
  TENANT = 'Tenant',
  TRANSACTION = 'Transaction',
  REPORT = 'Report',
  USER = 'User',
  USERS_SITES = 'UsersSites',
  LOGGING = 'Logging',
  PRICING = 'Pricing',
  PRICING_DEFINITION = 'PricingDefinition',
  BILLING = 'Billing',
  BILLING_PLATFORM = 'BillingPlatform',
  BILLING_ACCOUNT = 'BillingAccount',
  BILLING_TRANSFER = 'BillingTransfer',
  SETTING = 'Setting',
  ASYNC_TASK = 'AsyncTask',
  OCPI_ENDPOINT = 'OcpiEndpoint',
  OICP_ENDPOINT = 'OicpEndpoint',
  CONNECTION = 'Connection',
  ASSET = 'Asset',
  CAR_CATALOG = 'CarCatalog',
  CAR = 'Car',
  INVOICE = 'Invoice',
  TAX = 'Tax',
  REGISTRATION_TOKEN = 'RegistrationToken',
  CHARGING_PROFILE = 'ChargingProfile',
  NOTIFICATION = 'Notification',
  TAG = 'Tag',
  PAYMENT_METHOD = 'PaymentMethod',
  SOURCE = 'Source',
}

export enum Action {
  READ = 'Read',
  CREATE = 'Create',
  UPDATE = 'Update',
  UPDATE_BY_VISUAL_ID = 'UpdateByVisualID',
  REPLACE = 'Replace',
  REVOKE = 'Revoke',
  DELETE = 'Delete',
  LOGOUT = 'Logout',
  LOGIN = 'Login',
  LIST = 'List',
  IN_ERROR = 'InError',
  RESET = 'Reset',
  ASSIGN = 'Assign',
  UNASSIGN = 'Unassign',
  CLEAR_CACHE = 'ClearCache',
  TRIGGER_DATA_TRANSFER = 'DataTransfer',
  SYNCHRONIZE = 'Synchronize',
  GET_CONFIGURATION = 'GetConfiguration',
  CHANGE_CONFIGURATION = 'ChangeConfiguration',
  SYNCHRONIZE_CAR_CATALOGS = 'SynchronizeCarCatalogs',
  REMOTE_START_TRANSACTION = 'RemoteStartTransaction',
  REMOTE_STOP_TRANSACTION = 'RemoteStopTransaction',
  START_TRANSACTION = 'StartTransaction',
  STOP_TRANSACTION = 'StopTransaction',
  UNLOCK_CONNECTOR = 'UnlockConnector',
  AUTHORIZE = 'Authorize',
  SET_CHARGING_PROFILE = 'SetChargingProfile',
  GET_COMPOSITE_SCHEDULE = 'GetCompositeSchedule',
  CLEAR_CHARGING_PROFILE = 'ClearChargingProfile',
  GET_DIAGNOSTICS = 'GetDiagnostics',
  UPDATE_FIRMWARE = 'UpdateFirmware',
  EXPORT = 'Export',
  CHANGE_AVAILABILITY = 'ChangeAvailability',
  REFUND_TRANSACTION = 'RefundTransaction',
  SYNCHRONIZE_BILLING_USER = 'SynchronizeBillingUser',
  BILLING_SETUP_PAYMENT_METHOD = 'BillingSetupPaymentMethod',
  BILLING_PAYMENT_METHODS = 'BillingPaymentMethods',
  BILLING_DELETE_PAYMENT_METHOD = 'BillingDeletePaymentMethod',
  BILLING_CHARGE_INVOICE = 'BillingChargeInvoice',
  BILLING_ACTIVATE_SUB_ACCOUNT = 'BillingAccountActivate',
  BILLING_ONBOARD_SUB_ACCOUNT = 'BillingAccountOnboard',
  BILLING_FINALIZE_TRANSFER = 'BillingFinalizeTransfer',
  BILLING_SEND_TRANSFER = 'BillingSendTransfer',
  CHECK_CONNECTION = 'CheckConnection',
  CLEAR_BILLING_TEST_DATA = 'ClearBillingTestData',
  RETRIEVE_CONSUMPTION = 'RetrieveConsumption',
  READ_CONSUMPTION = 'ReadConsumption',
  CREATE_CONSUMPTION = 'CreateConsumption',
  PING = 'Ping',
  GENERATE_LOCAL_TOKEN = 'GenerateLocalToken',
  REGISTER = 'Register',
  TRIGGER_JOB = 'TriggerJob',
  DOWNLOAD = 'Download',
  IMPORT = 'Import',
  ASSIGN_USERS_TO_SITE = 'AssignUsers',
  UNASSIGN_USERS_FROM_SITE = 'UnassignUsers',
  ASSIGN_ASSETS_TO_SITE_AREA = 'AssignAssets',
  UNASSIGN_ASSETS_FROM_SITE_AREA = 'UnassignAssets',
  READ_ASSETS_FROM_SITE_AREA = 'ReadAssets',
  ASSIGN_CHARGING_STATIONS_TO_SITE_AREA = 'AssignChargingStations',
  UNASSIGN_CHARGING_STATIONS_FROM_SITE_AREA = 'UnassignChargingStations',
  READ_CHARGING_STATIONS_FROM_SITE_AREA = 'ReadChargingStationsFromSiteArea',
  EXPORT_OCPP_PARAMS = 'ExportOCPPParams',
  GENERATE_QR = 'GenerateQrCode',
  MAINTAIN_PRICING_DEFINITIONS = 'MaintainPricingDefinitions',
  RESOLVE = 'Resolve',
  GET_STATUS_NOTIFICATION = 'GetStatusNotification',
  GET_BOOT_NOTIFICATION = 'GetBootNotification',
  RESERVE_NOW = 'ReserveNow',
  UPDATE_OCPP_PARAMS = 'UpdateOCPPParams',
  LIMIT_POWER = 'LimitPower',
  DELETE_CHARGING_PROFILE = 'DeleteChargingProfile',
  GET_OCPP_PARAMS = 'GetOCPPParams',
  UPDATE_CHARGING_PROFILE = 'UpdateChargingProfile',
  GET_CONNECTOR_QR_CODE = 'GetConnectorQRCode',
}

export interface AuthorizationContext {
  tagIDs?: string[];
  tagID?: string;
  owner?: string;
  site?: string;
  sites?: string[];
  sitesAdmin?: string[];
  user?: string;
  UserID?: string;
  sitesOwner?: string[];
  company?: string;
  companies?: string[];
  asset?: string;
  assets?: string[];
  filters?: DynamicAuthorizationFilterName[] | [DynamicAuthorizationFilterName[]];
  asserts?: DynamicAuthorizationAssertName[] | [DynamicAuthorizationAssertName[]];
  metadata?: Record<string, AuthorizationDefinitionFieldMetadata>;
}

export interface AuthorizationActions {
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  canListUsers?: boolean;
  projectFields?: string[];
  metadata?: Record<string, unknown>;
}

export interface TagAuthorizationActions extends AuthorizationActions {
  canUnassign?: boolean;
  canAssign?: boolean;
  canUpdateByVisualID?: boolean;
}

export interface RegistrationTokenAuthorizationActions extends AuthorizationActions {
  canRevoke?: boolean;
}

export interface AssetAuthorizationActions extends AuthorizationActions {
  canRetrieveConsumption?: boolean;
  canReadConsumption?: boolean;
  canCheckConnection?: boolean;
  canCreateConsumption?: boolean;
}

export interface SiteAreaAuthorizationActions extends AuthorizationActions {
  canAssignAssets?: boolean;
  canUnassignAssets?: boolean;
  canReadAssets?: boolean;
  canAssignChargingStations?: boolean;
  canUnassignChargingStations?: boolean;
  canReadChargingStations?: boolean;
  canExportOCPPParams?: boolean;
  canGenerateQrCode?: boolean;
}

export interface SiteAuthorizationActions extends AuthorizationActions {
  canAssignUsers?: boolean;
  canUnassignUsers?: boolean;
  canReadUsers?: boolean;
  canExportOCPPParams?: boolean;
  canGenerateQrCode?: boolean;
  canMaintainPricingDefinitions?: boolean;
}

export type BillingTaxAuthorizationActions = AuthorizationActions;

export interface BillingInvoiceAuthorizationActions extends AuthorizationActions {
  canDownload?: boolean;
}

export interface ChargingStationAuthorizationActions extends AuthorizationActions {
  canReserveNow?:boolean;
  canReset?:boolean;
  canClearCache?:boolean;
  canGetConfiguration?:boolean;
  canChangeConfiguration?:boolean;
  canSetChargingProfile?:boolean;
  canGetCompositeSchedule?:boolean;
  canClearChargingProfile?:boolean;
  canGetDiagnostics?:boolean;
  canUpdateFirmware?:boolean;
  canRemoteStopTransaction?:boolean;
  canStopTransaction?:boolean;
  canStarTransaction?:boolean;
  canChangeAvailability?:boolean;
  canRemoteStartTransaction?:boolean;
  canUnlockConnector?:boolean;
  canDataTransfer?:boolean;
  canGenerateQrCode?:boolean;
  canMaintainPricingDefinitions?:boolean;
  canUpdateOCPPParams?:boolean;
  canLimitPower?:boolean;
  canDeleteChargingProfile?:boolean;
  canGetOCPPParams?:boolean;
  canUpdateChargingProfile?:boolean;
  canGetConnectorQRCode?:boolean;
}

export interface ConnectorAuthorizationActions extends AuthorizationActions {
  canRemoteStopTransaction?:boolean;
  canRemoteStartTransaction?:boolean;
  canUnlockConnector?:boolean;
}

export interface ChargingProfileAuthorizationActions extends AuthorizationActions {
  canDownload?:boolean;
  canReadSiteArea?:boolean;
}
export interface BillingAccountAuthorizationActions extends AuthorizationActions {
  canOnboard?: boolean;
}

export interface BillingTransferAuthorizationActions extends AuthorizationActions {
  canTransfer?: boolean;
}

export enum DynamicAuthorizationFilterName {
  ASSIGNED_SITES_COMPANIES = 'AssignedSitesCompanies',
  SITES_ADMIN = 'SitesAdmin',
  SITES_OWNER = 'SitesOwner',
  ASSIGNED_SITES = 'AssignedSites',
  OWN_USER = 'OwnUser',
  LOCAL_ISSUER = 'LocalIssuer',
  EXCLUDE_ACTION = 'ExcludeAction',
  INCLUDE_ALL_EXTERNAL_SITES = 'IncludeAllExternalSites',
}

export enum DynamicAuthorizationAssertName {
  POOL_CAR = 'PoolCar',
  OWN_USER = 'OwnUser',
  BASIC_USER = 'BasicUser',
  USER_MANDATORY = 'UserMandatory',
  SITE_AREA_MANDATORY = 'SiteAreaMandatory',
}

export enum DynamicAuthorizationDataSourceName {
  ASSIGNED_SITES_COMPANIES = 'AssignedSitesCompanies',
  SITES_ADMIN = 'SitesAdmin',
  SITES_OWNER = 'SitesOwner',
  ASSIGNED_SITES = 'AssignedSites',
  OWN_USER = 'OwnUser',
  EXCLUDE_ACTION = 'ExcludeAction',
  INCLUDE_ALL_EXTERNAL_SITES = 'IncludeAllExternalSites',
}

export interface DynamicAuthorizationDataSourceData { }

export interface AssignedSitesCompaniesDynamicAuthorizationDataSourceData extends DynamicAuthorizationDataSourceData {
  companyIDs?: string[];
}

export interface SitesAdminDynamicAuthorizationDataSourceData extends DynamicAuthorizationDataSourceData {
  siteIDs?: string[];
}

export interface SitesOwnerDynamicAuthorizationDataSourceData extends DynamicAuthorizationDataSourceData {
  siteIDs?: string[];
}

export interface AssignedSitesDynamicAuthorizationDataSourceData extends DynamicAuthorizationDataSourceData {
  siteIDs?: string[];
}

export interface SiteAdminUsersDynamicAuthorizationDataSourceData extends DynamicAuthorizationDataSourceData {
  userIDs?: string[];
}

export interface OwnUserDynamicAuthorizationDataSourceData extends DynamicAuthorizationDataSourceData {
  userID?: string;
}
