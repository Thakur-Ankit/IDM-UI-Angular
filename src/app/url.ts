export class URLs {

  // private static API_BASE = 'http://localhost:8080/api';
  private static API_BASE = 'http://dev.idm.upsnap.com/api';

  public static LOGIN = `${URLs.API_BASE}/login`;

  public static REPORT_SUMMARY = `${URLs.API_BASE}/report/summary`;

  public static REPORT_GRAPH = `${URLs.API_BASE}/report/graph`;

  public static CAMPAIGN_DASHBOARD = `${URLs.API_BASE}/campaigns/detail`;

  public static ADVERTISER_DASHBOARD = `${URLs.API_BASE}/advertisers/detail`;

  public static AGENCY_DASHBOARD = `${URLs.API_BASE}/agencies`;

  public static USER_DASHBOARD = `${URLs.API_BASE}/users/detail`;
}
