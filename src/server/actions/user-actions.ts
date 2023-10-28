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
      onSuccess: (data) => data,
      onError: (error) => error,
    });
  };

  static resetPassword = () => {
    return useMutation({
      mutationKey: ["reset-password"],
      mutationFn: (data: { password: string; new_password: string }) =>
        $fetch(`/v1/auth/reset-password`, {
          method: "PATCH",
          data,
        }).then((res) => res.data),
      onSuccess: (data) => {console.log("Reset pass ok");},
      onError: (error) => {console.log("Reset pass ko ok");},
    });
  };
}
