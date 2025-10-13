'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-left text-sg-red font-heading">
            SUI GENERIS
          </SheetTitle>
        </SheetHeader>
        
        <nav className="flex flex-col space-y-4 mt-8">
          <Link
            href="/category/laptops"
            className="text-lg font-medium transition-colors hover:text-sg-red"
            onClick={onClose}
          >
            Laptops
          </Link>
          <Link
            href="/category/phones"
            className="text-lg font-medium transition-colors hover:text-sg-red"
            onClick={onClose}
          >
            Phones
          </Link>
          <Link
            href="/category/printers"
            className="text-lg font-medium transition-colors hover:text-sg-red"
            onClick={onClose}
          >
            Printers
          </Link>
          <Link
            href="/category/accessories"
            className="text-lg font-medium transition-colors hover:text-sg-red"
            onClick={onClose}
          >
            Accessories
          </Link>
          <Link
            href="/configurator"
            className="text-lg font-medium text-sg-aqua transition-colors hover:text-sg-aqua/80"
            onClick={onClose}
          >
            PC Configurator
          </Link>
          
          <div className="border-t pt-4 mt-4">
            <Link
              href="/account"
              className="text-lg font-medium transition-colors hover:text-sg-red"
              onClick={onClose}
            >
              My Account
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
