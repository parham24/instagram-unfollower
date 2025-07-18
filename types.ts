
export interface InstagramDataItem {
  href: string;
  value: string;
  timestamp: number;
}

export interface InstagramDataEntry {
  title: string;
  media_list_data: any[];
  string_list_data: InstagramDataItem[];
}

export interface AnalysisResults {
  doNotFollowBack: string[];
  fans: string[];
  mutual: string[];
  unfollowers: string[];
}
