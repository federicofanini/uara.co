import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserMenuClient } from "@/components/dashboard/user-menu-client";

type Props = {
  onlySignOut?: boolean;
};

export async function UserMenu({ onlySignOut }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  return <UserMenuClient user={user} onlySignOut={onlySignOut} />;
}
