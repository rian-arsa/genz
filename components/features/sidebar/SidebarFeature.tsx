import {
  SidebarCollapseSkeleton,
  SidebarCollapse as SidebarCollapse,
} from "@/components/ui";

export type TSidebarCollapseGroupProps = {
  isLoading: boolean;
  title: string;
  children: React.ReactNode;
};

export const SidebarCollapseGroup = ({
  isLoading,
  children,
}: TSidebarCollapseGroupProps) => {
  if (isLoading) {
    return <SidebarCollapseSkeleton />;
  }

  return <SidebarCollapse title="Parlemen Sosial">{children}</SidebarCollapse>;
};
