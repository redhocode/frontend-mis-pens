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
    className={cn("justify-start gap-2 hover:bg-transparent",className)} {...props}
    >
        {Icon && <Icon/>}
        <span>{children}</span>
    </Button>
  )
}