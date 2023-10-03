import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class UserUseMutation {
  static updateProfile = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch("/v1/users/profile", {
          method: "PATCH",
          data: data,
        }),
        onSuccess: data => data,
        onError: error => error
    });
  };
}
