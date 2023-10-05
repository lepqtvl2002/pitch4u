import PitchOrder from "@/components/landing/order";
import Comment from "@/components/landing/comment";
import { notFound } from "next/navigation";
import { Stars } from "@/components/ui/vote-stars";
import { $globalFetch } from "@/lib/axios";

const CommentList = [
  { id: 1, author: "Nguyen Van A", text: "This is one comment" },
  { id: 2, author: "Nguyen Van B", text: "This is *another* comment" },
];

const PitchDetail = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const slug = params.slug;
  console.log("slug", slug);
  const res = await $globalFetch.get(`/v1/pitches/slugs/${slug}`);
  const pitch = {
    ...res.data.result,
    types: ["san5", "san7", "san11"],
    imageUrls: [
      "/pitch4u-photo01.webp",
      "/pitch4u-photo06.webp",
      "/pitch4u-photo07.webp",
      "/pitch4u-photo06.webp",
      "/pitch4u-photo07.webp",
      "/pitch4u-photo07.webp",
      "/pitch4u-photo07.webp",
    ],
    prices: {
      "6:00 - 7:00": 200,
      "7:00 - 8:00": 200,
      "8:00 - 9:00": 200,
      "9:00 - 10:00": 200,
      "10:00 - 11:00": 200,
    },
    subPitches: [
      {
        id: 1,
        name: "A1",
      },
      {
        id: 2,
        name: "A2",
      },
      {
        id: 3,
        name: "A3",
      },
      {
        id: 4,
        name: "A4",
      },
    ],
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
            <p>
              <span className={"text-xl"}>5</span> Trên 5
            </p>
            <Stars rating={4.2} className={"text-yellow-400 text-xl"} />
          </div>

          {/*<VoteStars initialRating={userRating} onRatingChange={handleRatingChange} />*/}
        </section>
        <section id={"comment"} className={"flex flex-col space-y-2"}>
          {CommentList.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              className={"border-b "}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default PitchDetail;
