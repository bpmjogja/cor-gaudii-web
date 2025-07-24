
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Mountain, Newspaper, Users, Calendar, LogOut, Home, BookOpen } from "lucide-react";
import { User } from "lucide-react";

const adminNavLinks = [
    { href: "/admin", label: "Dashboard", icon: Mountain },
    { href: "/admin/articles", label: "Articles", icon: Newspaper },
    { href: "/admin/courses", label: "Courses", icon: BookOpen },
    { href: "/admin/members", label: "Members", icon: Users },
    { href: "/admin/events", label: "Events", icon: Calendar },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="font-headline">BPM Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {adminNavLinks.map(link => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                </Link>
              ))}
            </nav>
          </div>
           <div className="mt-auto p-4 border-t">
            <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <Home className="h-4 w-4" />
                <span>Back to Website</span>
            </Link>
            <Link href="/auth/sign-in" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="font-headline">BPM Admin</span>
                </Link>
                {adminNavLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                    </Link>
                ))}
              </nav>
              <div className="mt-auto p-4 border-t">
                <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <Home className="h-4 w-4" />
                    <span>Back to Website</span>
                </Link>
                <Link href="/auth/sign-in" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="flex items-center justify-end gap-4">
                <span className="text-sm text-muted-foreground">Admin User</span>
                <User className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
