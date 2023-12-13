import PitchOrder from "@/components/landing/order";
import Review, { ReviewType } from "@/components/landing/review";
import { notFound } from "next/navigation";
import { Stars } from "@/components/ui/vote-stars";
import { $fetch } from "@/lib/axios";
import { pitchTypesArray } from "@/enums/pitchTypes";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const PitchDetail = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const session = await getServerSession(authOptions);
  const res = await $fetch.get(`/v1/pitches/slugs/${slug}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken?.token}`,
    },
  });
  const pitch = {
    ...res.data.result,
    types: pitchTypesArray,
    imageUrls: res.data.result.images,
    isLiked: res.data.result?.likes?.find(
      (e: { user_id: number }) => e.user_id === session?.user.userId
    ),
  };

  if (res.status !== 200) return notFound();
  return (
    <div className={"w-full flex flex-col"}>
      <PitchOrder pitch={pitch} />
      <div
        className={
          "flex flex-col space-y-4 p-2 md:p-4 mt-10 bg-white md:rounded"
        }
      >
        <h2 className={"md:text-3xl font-bold"}>Đánh giá, bình luận</h2>
        <section id={"voting"}>
          <div className={"border border-main md:rounded p-4"}>
            {pitch?.rate ? (
              <>
                <p>
                  <span className={"text-xl"}>
                    {Number(pitch?.rate).toFixed(1)}
                  </span>{" "}
                  Trên 5
                </p>
                <Stars
                  rating={pitch?.rate}
                  className={"text-yellow-400 text-xl"}
                />
                <Link href={"#comment"}>
                  {pitch?.reviews?.length || "Chưa có"} đánh giá
                </Link>
              </>
            ) : null}
          </div>

          {/*<VoteStars initialRating={userRating} onRatingChange={handleRatingChange} />*/}
        </section>
        <section id={"comment"} className={"flex flex-col space-y-2"}>
          {pitch?.reviews.map((review: ReviewType) => (
            <Review
              key={review.review_id}
              review={review}
              className="border-b"
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default PitchDetail;
