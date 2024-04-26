import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import { LucideIcon } from 'lucide-react'
 import { cn } from '@/lib/utils'
interface NavbarButtonProps extends ButtonProps {
    icon?: LucideIcon;
}
export const NavbarButton = ({icon: Icon,className,children,...props}: NavbarButtonProps) => {
  return (
    <Button
    variant={"ghost"}
    className={cn("gap-2 justify-start ",className)} {...props}
    >
        {Icon && <Icon/>}
        <span>{children}</span>
    </Button>
  )
}