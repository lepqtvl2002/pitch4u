import { useMutation } from "@tanstack/react-query";
import { $fetch, $globalFetch } from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";

export class PitchUseMutation {
  static pitchRegister = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch(`/v1/pitches/register`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {},
      onError: (err) => {
        toast({ title: "loi", description: "loi gi ko biet" });
      },
    });
  };
  static bookingPitch = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch(`/v1/booking`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {},
      onError: (err) => {
        toast({ title: "loi", description: "loi gi ko biet" });
      },
    });
  };

  static addSubPitch = () => {
    return useMutation({
      mutationFn: (data: Record<string, any>) =>
        $fetch(`/v1/pitches/subpitches`, {
          method: "POST",
          data,
        }).then((res) => res.data),
      onSuccess: () => {},
      onError: (err) => {
        toast({ title: "loi", description: "loi gi ko biet" });
      },
    });
  };
}
