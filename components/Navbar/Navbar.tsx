import Image from "next/image";
import Link from "next/link";

// constants
import { NavbarLinks } from "../constant";
import AuthProviders from "../AuthProviders/AuthProviders";

const Navbar = () => {
    const session = {};
    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={113} height={43} />
                </Link>
                <ul className="xl:flex hidden text-small gap-7">
                    {NavbarLinks.map((item) => (
                        <li key={item?.key}>
                            <Link href={item?.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flexCenter gap-4">
                {session ? (
                    <>
                        userPhoto
                        <Link href="/create-project">Share Work</Link>
                    </>
                ) : (
                    <AuthProviders />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
