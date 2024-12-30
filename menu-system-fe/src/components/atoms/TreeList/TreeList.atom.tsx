import { Menu } from "@/models/menu.model";
import { IconChevronDown, IconTrash } from "../icon";
import { cn } from "@/utils/helper.util";
import { MouseEvent, useCallback } from "react";

type Props = {
  menus?: Menu[];
  first?: boolean;
  onClicNew?: (menu: Menu & { level: number }) => void;
  onClicDelete?: (menu: Menu & { level: number }) => void;
  onSelect?: (menu: Menu) => void;
  level?: number;
};

export default function TreeList({
  menus,
  first,
  onClicNew,
  onSelect,
  level = 1,
  onClicDelete,
}: Props) {
  const handleToggleExpand = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const nextSibling =
      e.currentTarget.parentElement?.parentElement?.lastElementChild;
    if (!nextSibling || nextSibling === e.currentTarget.parentElement) return;

    e.currentTarget.classList.toggle("-rotate-90");
    const dataOpen = nextSibling.getAttribute("data-open");
    if (!dataOpen) {
      nextSibling.setAttribute("data-open", "true");
      return;
    }
    nextSibling.removeAttribute("data-open");
  }, []);

  if (!menus || !menus.length) return null;

  return (
    <ul className={cn("text-sm", !first && "data-[open]:block hidden")}>
      {menus.map((item) => (
        <li
          key={item.id}
          className={cn(
            "pl-[14px] ml-[14px] relative py-1.5 border-l last:border-transparent"
          )}
        >
          {!first && (
            <div
              className={cn(
                "absolute border-l border-b -left-[1px] -top-[1px] w-[14px] h-5",
                (item.children?.length || 0) === 0 && "w-[44px]"
              )}
            />
          )}
          <div className="flex items-center group w-fit">
            {(item.children?.length || 0) > 0 ? (
              <button
                className="w-[26px] aspect-square flex items-center justify-center -rotate-90 chevron-icon"
                onClick={handleToggleExpand}
              >
                <IconChevronDown width={14} height={14} />
              </button>
            ) : (
              <div className="aspect-square w-[26px]" />
            )}
            <button
              type="button"
              className="mx-3"
              onClick={() => onSelect && onSelect(item)}
            >
              <p>{item.name}</p>
            </button>
            <button
              type="button"
              className="bg-arctic-blue-600 rounded-full h-[26px] items-center justify-center w-[26px] text-white text-xl group-hover:flex hidden"
              onClick={() => onClicNew && onClicNew({ ...item, level })}
            >
              +
            </button>
            <button
              type="button"
              className="bg-red-500 ml-3 rounded-full h-[26px] items-center justify-center w-[26px] text-white text-xl group-hover:flex hidden"
              onClick={() => onClicDelete && onClicDelete({ ...item, level })}
            >
              <IconTrash width={14} height={14} />
            </button>
          </div>
          <TreeList
            menus={item.children}
            onSelect={onSelect}
            onClicNew={onClicNew}
            onClicDelete={onClicDelete}
            level={level + 1}
          />
        </li>
      ))}
    </ul>
  );
}
