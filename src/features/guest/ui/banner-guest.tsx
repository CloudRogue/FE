import cn from "@/src/shared/lib/cn";
import Card from "@/src/shared/ui/card";
import LogoIcon from "@/src/shared/ui/icons/logo.svg";

export function BannerGuest() {
  return (
    <section className="w-full px-4">
      <Card
        className={cn(
          "w-full h-45",
          "rounded-lg justify-end p-6! shadow-none! border-none text-white relative overflow-hidden flex flex-col ",
          "bg-[linear-gradient(135deg,#1788F0_0%,#2942CD_100%)]!",
          "transition-all duration-300",
        )}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "rgba(255,255,255,0.18)",
            clipPath: "polygon(0 0, 37% 0, 0 60%)",
          }}
        />
        <div className="z-10 flex flex-col items-start">
          <p className="mb-1 text-body2 font-normal tracking-tight opacity-90 sm:text-body1">
            복잡한 주택 공고는 그만!
          </p>

          <h2 className="mb-1 text-h1 font-bold leading-tight tracking-tighter">
            1분 만에 끝내는 추천 공고 찾기
          </h2>

          <p className="text-caption2 font-normal tracking-tight opacity-80 sm:text-body2">
            조건만 입력하면 딱 맞는 공고를 바로 알려드려요
          </p>
        </div>

        <LogoIcon
          className="absolute -right-4 -bottom-9 w-40 sm:w-45.5 h-auto opacity-15 pointer-events-none"
          style={{ color: "var(--color-gray-white)" }}
        />
      </Card>
    </section>
  );
}
