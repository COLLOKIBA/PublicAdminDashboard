"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./SideNav.module.css";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.navList}>
        {[
          { name: "Dashboard", path: "/dashboard" },
          { name: "Project Details", path: "/dashboard/projectDetails" },
          { name: "Geographic Details", path: "/dashboard/GeographicalDetails" },
          { name: "Project Status", path: "/dashboard/ProjectStatus" },
        ].map((item) => {
          const isActive = pathname.toLowerCase() === item.path.toLowerCase();

          return (
            <li key={item.path} className={styles.navItem}>
              <Link
                href={item.path}
                className={`${styles.navLink} ${
                  isActive ? styles.activeLink : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
