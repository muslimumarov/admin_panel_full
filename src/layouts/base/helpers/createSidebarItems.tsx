import { SidebarItemProps } from "flowbite-react";
import { ReactNode } from "react";
import {
  BookCopyIcon,
  BookOpenText,
  BotMessageSquareIcon,
  ChartBarStackedIcon,
  ChartNoAxesGanttIcon,
  FileStackIcon,
  Globe,
  HandshakeIcon,
  LayoutTemplateIcon,
  MessageCircleQuestion,
  MonitorIcon,
  Newspaper,
  SendToBackIcon,
  ShieldEllipsis,
  SquareLibraryIcon,
  TicketsPlaneIcon,
  UsersRound,
} from "lucide-react";
import { UserRole } from "../../../pages/user/enums/UserRole.ts";

interface SidebarItems
  extends Omit<SidebarItemProps, "children" | "label" | "icon"> {
  children?: SidebarItems[];
  label?: ReactNode;
  badge?: number;
  icon?: ReactNode;
  roles?: UserRole[];
}

const createSidebarItems = (t: (text: string) => string): SidebarItems[] => [
  {
    label: t("monitoring"),
    icon: <MonitorIcon />,
    href: "/dashboard",
    badge: 3,
  },
  {
    label: t("systemUsers"),
    icon: <UsersRound />,
    href: "/user",
    roles: [UserRole.SUPER_ADMIN],
  },
  {
    label: t("department"),
    icon: <SquareLibraryIcon />,
    href: "/department",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("departments"),
    icon: <LayoutTemplateIcon />,
    href: "/section",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("positions"),
    icon: <BookCopyIcon />,
    href: "/position",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("management"),
    icon: <ChartNoAxesGanttIcon />,
    href: "/management",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("news"),
    icon: <Newspaper />,
    href: "/news",
    badge: 3,
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("categories"),
    icon: <ChartBarStackedIcon />,
    href: "/category",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("articles"),
    icon: <BookOpenText />,
    href: "/articles",
    labelType: "Pro",
    labelColor: "dark",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("recommendations"),
    icon: <MessageCircleQuestion />,
    href: "/recommendation",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },

  {
    label: t("document"),
    icon: <FileStackIcon />,
    href: "/document",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("vacancies"),
    icon: <TicketsPlaneIcon />,
    href: "/vacancy",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("partners"),
    icon: <HandshakeIcon />,
    href: "/partner",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
  },
  {
    label: t("services"),
    icon: <Globe />,
    href: "/services",
    roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT, UserRole.ACCOUNTING],
  },
  {
    label: t("order"),
    icon: <SendToBackIcon />,
    href: "/order",
    roles: [UserRole.SUPER_ADMIN, UserRole.ACCOUNTING],
  },
  {
    label: t("incident"),
    icon: <ShieldEllipsis />,
    href: "/events",
    roles: [UserRole.SUPER_ADMIN, UserRole.MONITORING],
  },
  {
    label: t("chat"),
    icon: <BotMessageSquareIcon />,
    href: "/chat",
    roles: [UserRole.SUPER_ADMIN, UserRole.MONITORING, UserRole.CONTENT],
  },
];

export default createSidebarItems;
