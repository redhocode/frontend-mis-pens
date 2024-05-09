import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

interface Menu {
  label: string;
  href: string;
}

export function CustomBreadcrumb({ menu }: { menu: Menu[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="text-white">
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < menu.length - 1 && (
              <BreadcrumbSeparator style={{ color: "white" }} />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}