import PitchOrder from "@/components/landing/order";
import Review, { ReviewType } from "@/components/landing/review";
import { notFound } from "next/navigation";
import { Stars } from "@/components/ui/vote-stars";
import { $globalFetch } from "@/lib/axios";
import Link from "next/link";
import { IPitch } from "@/types/pitch";
import { CircleCheckBigIcon } from "lucide-react";
import { activeVariant, cn } from "@/lib/utils";

const PitchDetail = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const res = await $globalFetch.get(`/v1/pitches/slugs/${slug}`);
  const pitch = {
    ...(res.data.result as IPitch),
  };

  if (res.status === 404) return notFound();
  return (
    <div className={"w-full flex flex-col"}>
      <PitchOrder pitch={pitch} />
      <div className="flex flex-col space-y-4 p-2 md:p-4 mt-10 bg-white md:rounded">
        <span>{pitch.description}</span>
        <div className="flex flex-wrap gap-2">
          {pitch.services.map((service, index) => (
            <span
              key={index}
              className={cn(
                "flex items-center",
                activeVariant({ variant: true })
              )}
            >
              <CircleCheckBigIcon className="mr-2" /> {service}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-4 p-2 md:p-4 mt-10 bg-white md:rounded">
        <h2 className={"md:text-3xl font-bold"}>Đánh giá, bình luận</h2>
        <section className={"voting"}>
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
                  rating={Number(pitch?.rate)}
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
