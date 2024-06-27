import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalizeFirstLetter } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function BreadcrumbDashboard() {
  const pathName = usePathname();
  const pathNames = pathName.split("/");

  // Create an array of cumulative paths
  const cumulativePaths = pathNames.reduce<string[]>((acc, current, index) => {
    if (index === 0) {
      acc.push(current);
    } else {
      acc.push(`${acc[index - 1]}/${current}`);
    }
    return acc;
  }, []);

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {pathNames.map((path, index) => {
          if (path === "") {
            return null;
          }
          return (
            <>
              <BreadcrumbItem key={index}>
                {index === pathNames.length - 1 ? (
                  <BreadcrumbPage>{capitalizeFirstLetter(path)}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={`${cumulativePaths[index]}`}>
                      {capitalizeFirstLetter(path)}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
