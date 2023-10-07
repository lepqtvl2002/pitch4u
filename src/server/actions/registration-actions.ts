import { $fetch } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export class RegistrationUseMutation {
  static approve = () => {
    return useMutation({
      mutationFn: ({ registration_id }: { registration_id: string | number }) =>
        $fetch("/v1/pitches/approve", {
          method: "PATCH",
          data: {
            registration_id,
          },
        }),
      onSuccess: (data) => data,
      onError: (error) => error,
    });
  };
}
