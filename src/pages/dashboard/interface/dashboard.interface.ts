export interface DashboardInterface {
  articles: ContentInterface;
  news: ContentInterface;
  document: ContentInterface;
  recommendations: RecommendationsInterface;
  order: {
    status: OrderInterface[];
    perDay: string;
  };
  tracker: TrackerResponse;
  action: ActionStats;
}

export interface TrackerData {
  createdAt: string;
  method: string;
  status: number;
  url: string;
  role: string;
  email: string;
}

export interface TrackerResponse {
  data: TrackerData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface PaginationInterface {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContentInterface {
  total: number;
  draft: number;
  published: number;
}

export interface RecommendationsInterface {
  total: number;
  professional: number;
  educational: number;
  personal: number;
}

export interface OrderInterface {
  id: number;
  status: "completed" | "pending" | "in_progress" | "canceled";
  count: number;
  statisticId: number;
}

export interface TrackerInterface {
  id: number;
  method: string;
  ms: number;
  status: number;
  url: string;
  createdAt: string;
}

export interface ActionTypeInterface {
  id: number;
  type: string;
  count: number;
  statisticId: number;
}

export interface ActionRegionInterface {
  id: number;
  region: string;
  count: number;
  statisticId: number;
}

export interface ActionPerDayInterface {
  id: number;
  date: string;
  count: number;
  statisticId: number;
}

export interface ActionStats {
  type: ActionTypeInterface[];
  region: ActionRegionInterface[];
  perDay: ActionPerDayInterface[];
}
