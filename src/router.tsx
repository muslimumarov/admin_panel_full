import { Navigate, useRoutes } from "react-router-dom";
import { lazy } from "react";
import BaseLayout from "./layouts/base/BaseLayout.tsx";
import { HasAccess, IsGuest, IsLoggedIn } from "./core/guards";
import { UserRole } from "./pages/user/enums/UserRole.ts";

const AuthLayout = lazy(() => import("./layouts/auth/AuthLayout"));
const LoginPage = lazy(() => import("./layouts/auth/login/Login.tsx"));

// Dashboard Pages
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard.tsx"));

// News Pages
const News = lazy(() => import("./pages/news/News.tsx"));
const NewsList = lazy(() => import("./pages/news/pages/List.tsx"));
const NewsForm = lazy(() => import("./pages/news/pages/Form.tsx"));
const NewsView = lazy(() => import("./pages/news/pages/View.tsx"));
// Articles Pages
const Articles = lazy(() => import("./pages/articles/Articles.tsx"));
const ArticlesList = lazy(() => import("./pages/articles/pages/List.tsx"));
const ArticlesForm = lazy(() => import("./pages/articles/pages/Form.tsx"));
const ArticlesView = lazy(() => import("./pages/articles/pages/View.tsx"));
// Services Pages
const Services = lazy(() => import("./pages/services/Services.tsx"));
const ServicesList = lazy(() => import("./pages/services/pages/List.tsx"));
const ServicesForm = lazy(() => import("./pages/services/pages/Form.tsx"));
const ServicesView = lazy(() => import("./pages/services/pages/View.tsx"));
// Recommendation Pages
const Recommendation = lazy(
  () => import("./pages/recommendation/Recommendation.tsx"),
);
const RecommendationList = lazy(
  () => import("./pages/recommendation/pages/List.tsx"),
);
const RecommendationForm = lazy(
  () => import("./pages/recommendation/pages/Form.tsx"),
);
const RecommendationView = lazy(
  () => import("./pages/recommendation/pages/View.tsx"),
);
// Events Message Pages
const Events = lazy(() => import("./pages/events/Events.tsx"));
const EventsList = lazy(() => import("./pages/events/pages/List.tsx"));
const EventsView = lazy(() => import("./pages/events/pages/View.tsx"));
// Vacancy
const Vacancy = lazy(() => import("./pages/vacancy/Vacancy.tsx"));
const VacancyList = lazy(() => import("./pages/vacancy/pages/List.tsx"));
const VacancyForm = lazy(() => import("./pages/vacancy/pages/Form.tsx"));
const VacancyView = lazy(() => import("./pages/vacancy/pages/View.tsx"));
// Partner
const Documents = lazy(() => import("./pages/documents/Documents.tsx"));
const DocumentsList = lazy(() => import("./pages/documents/pages/List.tsx"));
const DocumentsForm = lazy(() => import("./pages/documents/pages/Form.tsx"));
const DocumetnView = lazy(() => import("./pages/documents/pages/View.tsx"));
// Position
const Position = lazy(() => import("./pages/position/Position.tsx"));
const PositionList = lazy(() => import("./pages/position/pages/List.tsx"));
const PositionForm = lazy(() => import("./pages/position/pages/Form.tsx"));
// Management
const Management = lazy(() => import("./pages/boshqaruv/Management.tsx"));
const ManagementList = lazy(() => import("./pages/boshqaruv/pages/List.tsx"));
const ManagementForm = lazy(() => import("./pages/boshqaruv/pages/Form.tsx"));
const ManagementView = lazy(() => import("./pages/boshqaruv/pages/View.tsx"));
// Order
const Order = lazy(() => import("./pages/order/Order.tsx"));
const OrderList = lazy(() => import("./pages/order/pages/List.tsx"));
const OrderView = lazy(() => import("./pages/order/pages/View.tsx"));

// Chat
const Chat = lazy(() => import("./pages/chat/Chat.tsx"));
const ChatList = lazy(() => import("./pages/chat/pages/List.tsx"));
const ChatView = lazy(() => import("./pages/chat/pages/View.tsx"));

// Position
const Category = lazy(() => import("./pages/categories/Category.tsx"));
const CategoryList = lazy(() => import("./pages/categories/pages/List.tsx"));
const CategoryForm = lazy(() => import("./pages/categories/pages/Form.tsx"));
// Department
const Department = lazy(() => import("./pages/department/Department.tsx"));
const DepartmentList = lazy(() => import("./pages/department/pages/List.tsx"));
const DepartmentForm = lazy(() => import("./pages/department/pages/Form.tsx"));
// // Section
const Section = lazy(() => import("./pages/section/Section.tsx"));
const SectionList = lazy(() => import("./pages/section/pages/List.tsx"));
const SectionForm = lazy(() => import("./pages/section/pages/Form.tsx"));
// Settings
const Settings = lazy(() => import("./pages/settings/Settings.tsx"));
const SettingsPassword = lazy(
  () => import("./pages/settings/pages/PasswordChange.tsx"),
);
// User
const UserManagement = lazy(() => import("./pages/user/UserManagement.tsx"));
const UserManagementList = lazy(() => import("./pages/user/pages/List.tsx"));
const UserManagementForm = lazy(() => import("./pages/user/pages/Form.tsx"));
// Parner
const Partner = lazy(() => import("./pages/partner/Partner.tsx"));
const PartnerList = lazy(() => import("./pages/partner/pages/List.tsx"));
const PartnerForm = lazy(() => import("./pages/partner/pages/Form.tsx"));

function Router() {
  const routes = [
    {
      path: "/auth",
      element: (
        <IsGuest>
          <AuthLayout />
        </IsGuest>
      ),
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <IsLoggedIn>
          <BaseLayout />
        </IsLoggedIn>
      ),
      children: [
        {
          path: "",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "news",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
              <News />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <NewsList />,
            },
            {
              path: "create",
              element: <NewsForm />,
            },
            {
              path: "edit/:id",
              element: <NewsForm />,
            },
            {
              path: "view/:id",
              element: <NewsView />,
            },
          ],
        },
        {
          path: "articles",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
              <Articles />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <ArticlesList />,
            },
            {
              path: "create",
              element: <ArticlesForm />,
            },
            {
              path: "edit/:id",
              element: <ArticlesForm />,
            },
            {
              path: "view/:id",
              element: <ArticlesView />,
            },
          ],
        },
        {
          path: "services",
          element: (
            <HasAccess
              roles={[
                UserRole.SUPER_ADMIN,
                UserRole.CONTENT,
                UserRole.ACCOUNTING,
              ]}
            >
              <Services />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <ServicesList />,
            },
            {
              path: "create",
              element: (
                <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
                  <ServicesForm />
                </HasAccess>
              ),
            },
            {
              path: "edit/:id",
              element: (
                <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
                  <ServicesForm />
                </HasAccess>
              ),
            },
            {
              path: "view/:id",
              element: <ServicesView />,
            },
          ],
        },
        {
          path: "recommendation",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
              <Recommendation />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <RecommendationList />,
            },
            {
              path: "create",
              element: <RecommendationForm />,
            },
            {
              path: "edit/:id",
              element: <RecommendationForm />,
            },
            {
              path: "view/:id",
              element: <RecommendationView />,
            },
          ],
        },
        {
          path: "events",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.MONITORING]}>
              <Events />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <EventsList />,
            },
            {
              path: "view/:id",
              element: <EventsView />,
            },
          ],
        },
        {
          path: "document",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
              <Documents />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <DocumentsList />,
            },
            {
              path: "create",
              element: <DocumentsForm />,
            },
            {
              path: "edit/:id",
              element: <DocumentsForm />,
            },
            {
              path: "view/:id",
              element: <DocumetnView />,
            },
          ],
        },
        {
          path: "vacancy",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
              <Vacancy />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <VacancyList />,
            },
            {
              path: "create",
              element: <VacancyForm />,
            },
            {
              path: "edit/:id",
              element: <VacancyForm />,
            },
            {
              path: "view/:id",
              element: <VacancyView />,
            },
          ],
        },
        {
          path: "position",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN]}>
              <Position />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <PositionList />,
            },
            {
              path: "create",
              element: <PositionForm />,
            },
            {
              path: "edit/:id",
              element: <PositionForm />,
            },
          ],
        },
        {
          path: "management",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN]}>
              <Management />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <ManagementList />,
            },
            {
              path: "create",
              element: <ManagementForm />,
            },
            {
              path: "edit/:id",
              element: <ManagementForm />,
            },
            {
              path: "view/:id",
              element: <ManagementView />,
            },
          ],
        },
        {
          path: "order",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.ACCOUNTING]}>
              <Order />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <OrderList />,
            },
            {
              path: "view/:id",
              element: <OrderView />,
            },
          ],
        },
        {
          path: "chat",
          element: (
            <HasAccess
              roles={[
                UserRole.SUPER_ADMIN,
                UserRole.CONTENT,
                UserRole.MONITORING,
              ]}
            >
              <Chat />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <ChatList />,
            },
            {
              path: "view/:id",
              element: <ChatView />,
            },
          ],
        },
        {
          path: "category",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN, UserRole.CONTENT]}>
              <Category />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <CategoryList />,
            },
            {
              path: "create",
              element: <CategoryForm />,
            },
            {
              path: "edit/:id",
              element: <CategoryForm />,
            },
          ],
        },
        {
          path: "department",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN]}>
              <Department />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <DepartmentList />,
            },
            {
              path: "create",
              element: <DepartmentForm />,
            },
            {
              path: "edit/:id",
              element: <DepartmentForm />,
            },
          ],
        },
        {
          path: "section",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN]}>
              <Section />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <SectionList />,
            },
            {
              path: "create",
              element: <SectionForm />,
            },
            {
              path: "edit/:id",
              element: <SectionForm />,
            },
          ],
        },
        {
          path: "settings",
          element: <Settings />,
          children: [
            {
              path: "",
              element: <SettingsPassword />,
            },
          ],
        },
        {
          path: "user",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN]}>
              <UserManagement />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <UserManagementList />,
            },
            {
              path: "create",
              element: <UserManagementForm />,
            },
            {
              path: "edit/:id",
              element: <UserManagementForm />,
            },
          ],
        },
        {
          path: "partner",
          element: (
            <HasAccess roles={[UserRole.SUPER_ADMIN]}>
              <Partner />
            </HasAccess>
          ),
          children: [
            {
              path: "",
              element: <PartnerList />,
            },
            {
              path: "create",
              element: <PartnerForm />,
            },
            {
              path: "edit/:id",
              element: <PartnerForm />,
            },
          ],
        },
        {
          path: "error/forbidden",
          element: <div>Forbidden</div>,
        },
      ],
    },

    // {
    //     path: '*',
    //     element: <Navigate to={'/error/not-found'} />
    // }
  ];

  return useRoutes(routes);
}

export default Router;
