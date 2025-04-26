import {
        SignedIn,
        SignedOut,
        SignInButton,
        SignUpButton,
        UserButton,
      } from "@clerk/nextjs";
      
      import React from "react";
      // Link
      import Link from "next/link";
      // Logo
      // import Logo from "./ui/logo";
      // Button
      import { Button } from "./ui/button";
      // Icons
      import { ChevronDown, LayoutDashboard, StarsIcon } from "lucide-react";
      // Dropdown Menu
      import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
      } from "@radix-ui/react-dropdown-menu";
      import Image from "next/image";
      
      const Header = () => {
        return (
          <>
            <nav className="container fixed top-0 mx-auto z-50 px-4 h-16 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="w-fit h-fit ">
                {/* <Logo /> */}
              </Link>
              {/* Navbar Button */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* If User Signed In */}
                <SignedIn>
                  <Link href={`/dashboard`}>
                    <Button variant="outline">
                      <LayoutDashboard className="h-4 w-4"></LayoutDashboard>
                      <span className="hidden md:block">Industry Insight</span>
                    </Button>
                  </Link>
      
                  {/* Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>
                        <StarsIcon className="h-4 w-4" />
                        <span className="hidden md:block">Growth Tools</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={"/resume"}
                          className="flex items-center p-1 gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="hidden md:block">Build Resume</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={"/ai-coverLetter"}
                          className="flex items-center p-1 gap-2"
                        >
                          <PenBox className="h-4 w-4" />
                          <span className="hidden md:block">Cover Letter</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={"/interview"}
                          className="flex items-center p-1 gap-2"
                        >
                          <GraduationCap className="h-4 w-4" />
                          <span className="hidden md:block">Interview Prep</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SignedIn>
      
                {/* If User Signed Out */}
                <SignedOut>
                  <SignInButton>
                    <Button variant={"outline"}>Login</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button>Signup</Button>
                  </SignUpButton>
                </SignedOut>
      
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full",
                        userButtonPopoverCard: "shadow-xl",
                        userPreviewMainIdentifier: "font-semibold",
                      },
                    }}
                    afterSignOutUrl="/"
                  />
                </SignedIn>
              </div>
            </nav>
          </>
        );
      };
      
      export default Header;
      {
        /* <Image
                  src={DarkLogo}
                  alt="ResumeAi Logo"
                  width={300}
                  height={60}
                  className="h-12 py-1 w-auto object-contain mix-blend-multiply bg-blend-multiply"
                /> */
      }
      
      //
      // }
      