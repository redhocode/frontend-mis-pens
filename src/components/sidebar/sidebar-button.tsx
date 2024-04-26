import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import { LucideIcon } from 'lucide-react'
 import { cn } from '@/lib/utils'
interface SidebarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}
export const SidebarButton = ({icon: Icon,className,children,...props}: SidebarButtonProps) => {
  return (
    <Button
    variant={"ghost"}
    className={cn("gap-2 justify-start hover:bg-primary hover:text-white",className)} {...props}
    >
        {Icon && <Icon/>}
        <span>{children}</span>
    </Button>
  )
}
