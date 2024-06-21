"use client";
import { PitchItem } from "@/app/(general)/[slug]/components/search-bar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { mutatingToast } from "@/lib/quick-toast";
import { PitchUseMutation } from "@/server/actions/pitch-actions";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { HeartOffIcon, Search } from "lucide-react";
import Link from "next/link";

export default function FavoritePage() {
  const { data, isLoading, isError, refetch } =
    PitchUseQuery.getPitchesFavorite({});
  const { mutateAsync: likePitchMutate } = PitchUseMutation.likePitch();

  async function unLikePitch(pitchId: number | string) {
    mutatingToast();
    await likePitchMutate(pitchId);
    refetch();
  }

  if (isError) {
    toast({
      title: "Không thể tải danh sách",
      description: "Đã có lỗi xảy ra",
      variant: "destructive",
    });
  }
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sân bóng yêu thích</h3>
        <p className="text-sm text-muted-foreground">
          Danh sách sân bóng được yêu thích của bạn.
        </p>
      </div>
      <Separator />
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div>
          {data?.result?.length ? (
            data?.result?.map((pitch) => (
              <div
                key={pitch.pitch_id}
                className="flex justify-between gap-2 items-center"
              >
                <PitchItem pitch={pitch} />
                <Button
                  size="icon"
                  className="rounded-full"
                  onClick={async () => {
                    await unLikePitch(pitch.pitch_id);
                  }}
                >
                  <HeartOffIcon />
                </Button>
              </div>
            ))
          ) : (
            <center className="w-full">
              <h3 className="m-10 text-xl font-medium">
                Có vẻ bạn chưa chọn được cho mình sân yêu thích
              </h3>
              <p>Hãy tới và chọn sân ngay nào!</p>
              <Link
                href="/#find-pitch"
                className="rounded-lg px-4 py-2 flex w-fit text-white bg-primary hover:bg-emerald-500"
              >
                <Search /> Tìm sân ngay
              </Link>
            </center>
          )}
        </div>
      )}
    </div>
  );
}
