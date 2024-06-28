import React from "react";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import db from "@/lib/supabase/db";
import { redirect } from "next/navigation";
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
import { getUserSubscriptionStatus } from "@/lib/supabase/queries";

const DashBoard = async () => {
  const supabase = createServerComponentClient({ cookies });

  let {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
  });
  const { data: subscription, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);
  if (subscriptionError) return;

  if (!workspace)
    return <DashboardSetup user={user} subscription={subscription} />;

  redirect(`/dashboard/${workspace?.id}`);

  return <div>Dashboard</div>;
};

export default DashBoard;
