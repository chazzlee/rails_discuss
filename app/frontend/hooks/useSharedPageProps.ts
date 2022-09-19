import { usePage } from "@inertiajs/inertia-react";
import { type Page } from "@inertiajs/inertia";
import { Channel, User } from "../types";

export function useSharedPageProps() {
  return usePage<
    Page<{
      currentUser: { data: User } | null;
      channels: { data: Channel[] };
    }>
  >().props;
}
