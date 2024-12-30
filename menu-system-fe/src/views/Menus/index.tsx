"use client";

import Button from "@/components/atoms/Button/Button.atom";
import Dropdown from "@/components/atoms/Dropdown";
import {
  IconDirectory,
  IconDirectoryFill,
  IconLogo,
  IconMenu,
  IconSubmenu1Fill,
} from "@/components/atoms/icon";
import InputText from "@/components/atoms/Input/Input";
import TreeList from "@/components/atoms/TreeList/TreeList.atom";
import { menus } from "@/constant/menu.constant";
import { Menu } from "@/models/menu.model";
import {
  useCreateMenuMutation,
  useDeleteMenuMutation,
  useGetListMenusParentQuery,
  useGetListMenusQuery,
  useUpdateMenuMutation,
} from "@/service/api/menu.service";
import { cn } from "@/utils/helper.util";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

function findMenu(
  menuId: string,
  data: Menu[],
  level = 1
): (Menu & { level: number }) | undefined {
  if (data.length === 0 || !menuId) return;

  let res: (Menu & { level: number }) | undefined = undefined;

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    if (item.id === menuId) {
      res = { ...item, level };
      break;
    }

    const foundItem = findMenu(menuId, item.children || [], level + 1);
    if (foundItem) {
      res = foundItem;
      break;
    }
  }

  return res;
}

type Form = {
  name: string;
  depth: number;
  parentName: string;
  id: string;
  parentId?: string;
};

export default function MenusView() {
  const [menusState, setMenusState] = useState(menus);
  const [listMenus, setListMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState({ id: "", name: "" });
  const [form, setForm] = useState<Form>({
    name: "",
    depth: 0,
    parentName: "",
    id: "",
  });
  const [formType, setFormType] = useState<"edit" | "create" | undefined>();

  const listMenusQuery = useGetListMenusQuery({ menuId: selectedMenu.id });

  const listParentsQuery = useGetListMenusParentQuery();
  const listParents = useMemo(
    () => (listParentsQuery.data?.ok ? listParentsQuery.data.data : []),
    [listParentsQuery.data]
  );

  const handleChange = useCallback(
    (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    },
    []
  );

  const handleToggleMenu = useCallback((index: number) => {
    setMenusState((prev) => {
      return prev.map((item, idx) =>
        index !== idx
          ? { ...item, active: false }
          : { ...item, active: !item.active }
      );
    });
  }, []);

  const handleSelectItem = useCallback(
    (data: Menu) => {
      setFormType("edit");
      const items = listMenusQuery.data?.ok ? listMenusQuery.data.data : [];
      const foundMenu = findMenu(data?.id || "", items);
      if (!foundMenu) return;

      const parent = findMenu(foundMenu.parentId || "", items);

      setForm({
        id: foundMenu.id,
        name: foundMenu.name,
        parentName: parent?.name || "",
        depth: foundMenu.level,
        parentId: parent?.parentId || undefined,
      });
    },
    [listMenusQuery.data]
  );

  const handleClickNew = useCallback((menu: Menu & { level: number }) => {
    setFormType("create");
    setForm({
      id: "",
      name: "",
      parentName: menu.name,
      depth: menu.level + 1,
      parentId: menu.id,
    });
  }, []);

  const [updateMutate] = useUpdateMenuMutation();
  const handleSaveUpdate = useCallback(async () => {
    await updateMutate({ id: form.id, name: form.name });
  }, [form.id, form.name, updateMutate]);

  const [createMutate] = useCreateMenuMutation();
  const handleSubmitCreate = useCallback(async () => {
    await createMutate({ name: form.name, parentId: form.parentId });
  }, [createMutate, form.name, form.parentId]);

  const [deleteMutate] = useDeleteMenuMutation();
  const handleDeleteItem = useCallback(
    async (menu: Menu) => {
      await deleteMutate({ id: menu.id });
    },
    [deleteMutate]
  );

  const handleExpandAll = useCallback(() => {
    document.querySelectorAll("ul").forEach((item) => {
      item.setAttribute("data-open", "true");
      item.querySelectorAll(".chevron-icon").forEach((icon) => {
        icon.classList.remove("-rotate-90");
      });
    });
  }, []);

  const handleCollapseAll = useCallback(() => {
    document.querySelectorAll("ul").forEach((item) => {
      item.removeAttribute("data-open");

      item.querySelectorAll(".chevron-icon").forEach((icon) => {
        icon.classList.add("-rotate-90");
      });
    });
  }, []);

  useEffect(() => {
    if (listMenusQuery.data?.ok) {
      setListMenus(listMenusQuery.data.data);
    }
  }, [listMenusQuery.data]);

  useEffect(() => {
    if (listParents.length === 0) return;

    setSelectedMenu({ id: listParents[0].id, name: listParents[0].name });
  }, [listParents]);

  return (
    <div className="flex min-h-screen min-w-[100vw]">
      <div className="bg-blue-gray-900 m-6 mr-0 rounded-3xl w-60 text-white">
        <div className="flex items-center justify-between px-8 py-[31.5px]">
          <IconLogo />
          <IconMenu />
        </div>
        <div className="px-4 py-2.5">
          {menusState.map((menu, index) => (
            <div
              key={menu.label}
              className={cn("rounded-2xl", menu.active && "bg-blue-gray-800")}
            >
              <button
                type="button"
                className="flex items-center gap-4 p-3 w-full"
                onClick={() => handleToggleMenu(index)}
              >
                {menu.active ? <IconDirectoryFill /> : <IconDirectory />}
                <p>{menu.label}</p>
              </button>
              {menu.submenus?.map((submenu) => (
                <div
                  key={menu.label + submenu.label}
                  className={cn(
                    "items-center gap-4 p-3 data-[active=true]:bg-lime-green-400 rounded-2xl hidden",
                    menu.active && "flex"
                  )}
                  data-active={submenu.active}
                >
                  {submenu.icon}
                  <p>{submenu.label}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full py-6 text-blue-gray-900">
        <div className="flex items-center py-4 px-12">
          <IconDirectoryFill fill="#D0D5DD" />
          <span className="ml-2 text-blue-gray-300">
            {"  "}/ <span>Menus</span>
          </span>
        </div>
        <div className="px-12 py-4 flex items-center gap-4">
          <div className="p-[14px] bg-arctic-blue-600 rounded-full w-fit">
            <IconSubmenu1Fill />
          </div>
          <p className="text-[32px] leading-10 font-extrabold">Menus</p>
        </div>
        <div className="px-12">
          <Dropdown
            label="Menu"
            placeholder="Menu"
            options={listParents.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            selected={selectedMenu.name}
            onSelect={(opt) => {
              setSelectedMenu({ id: opt.value, name: opt.label });
            }}
          />
        </div>
        <div className="px-12 py-7">
          <Button variant="dark" onClick={handleExpandAll}>
            Expand All
          </Button>
          <Button
            variant="outline"
            className="ml-2"
            onClick={handleCollapseAll}
          >
            Collapse All
          </Button>
        </div>
        <div className="grid grid-cols-2 px-12">
          <TreeList
            first
            menus={listMenus}
            onSelect={handleSelectItem}
            onClicNew={handleClickNew}
            onClicDelete={handleDeleteItem}
          />
          {formType !== undefined ? (
            <div>
              {form.id && (
                <InputText
                  label="Menu ID"
                  placeholder="Menu ID"
                  id="menuId"
                  name="menuId"
                  value={form.id}
                  onChange={handleChange("id")}
                  className="w-full"
                />
              )}
              <InputText
                label="Depth"
                placeholder="Depth"
                value={form.depth}
                onChange={handleChange("depth")}
                disabled
              />
              <InputText
                label="Parent Data"
                placeholder="Parent Data"
                value={form.parentName}
                onChange={handleChange("parentName")}
                readOnly
              />
              <InputText
                label="Name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange("name")}
              />
              <Button
                className="mt-4 w-[262px]"
                onClick={
                  formType === "edit" ? handleSaveUpdate : handleSubmitCreate
                }
              >
                Save
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
