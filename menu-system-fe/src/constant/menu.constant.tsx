import {
  IconSubmenu1,
  IconSubmenu1Fill,
  IconSubmenu2,
} from "@/components/atoms/icon";

type Menu = {
  label: string;
  active?: boolean;
  submenus?: { label: string; icon: React.ReactNode; active?: boolean }[];
};

export const menus: Menu[] = [
  {
    label: "Systems",
    active: true,
    submenus: [
      { label: "System Code", icon: <IconSubmenu1 /> },
      { label: "Properties", icon: <IconSubmenu2 /> },
      { label: "Menus", icon: <IconSubmenu1Fill fill="black" />, active: true },
      { label: "API List", icon: <IconSubmenu2 /> },
    ],
  },
  {
    label: "Users & Groups",
    submenus: [
      { label: "System Code", icon: <IconSubmenu1 /> },
      { label: "Properties", icon: <IconSubmenu2 /> },
      { label: "Menus", icon: <IconSubmenu1 /> },
      { label: "API List", icon: <IconSubmenu2 /> },
    ],
  },
  {
    label: "Competition",
    submenus: [
      { label: "System Code", icon: <IconSubmenu1 /> },
      { label: "Properties", icon: <IconSubmenu2 /> },
      { label: "Menus", icon: <IconSubmenu1 /> },
      { label: "API List", icon: <IconSubmenu2 /> },
    ],
  },
];
