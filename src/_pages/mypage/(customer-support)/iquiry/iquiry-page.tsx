import { ChevronDown } from "lucide-react";

export default function InquiryPage() {
  return (
    <>
      {/* 문의 유형 */}
      <div className="space-y-6">
        {/* 문의 유형 */}
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-[#333]">문의 유형</label>
          <div className="relative">
            <select className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-gray-800 focus:outline-none">
              <option>카테고리를 선택해주세요.</option>
            </select>
            <ChevronDown
              size={22}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none"
            />
          </div>
        </div>

        {/* 성함 */}
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-[#333]">성함</label>
          <input
            type="text"
            placeholder="성함을 입력해주세요."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] placeholder:text-gray-300 focus:border-gray-400 focus:outline-none transition-all"
          />
        </div>

        {/* 회신 이메일 */}
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-[#333]">
            회신 이메일
          </label>
          <input
            type="email"
            placeholder="답변 받으실 메일 주소를 입력해주세요."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] placeholder:text-gray-300 focus:border-gray-400 focus:outline-none transition-all"
          />
        </div>

        {/* 제목 */}
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-[#333]">제목</label>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] placeholder:text-gray-300 focus:border-gray-400 focus:outline-none transition-all"
          />
        </div>

        {/* 내용 */}
        <div className="space-y-2">
          <label className="text-[14px] font-bold text-[#333]">내용</label>
          <textarea
            rows={7}
            placeholder="내용을 입력해주세요."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-4 text-[14px] placeholder:text-gray-300 focus:border-gray-400 focus:outline-none transition-all"
          />
        </div>

        {/* 약관 동의 영역 */}
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-gray-400 tracking-tighter">
              개인(신용)정보의 수집 및 이용에 관한 사항 정보이용에 동의합니다.
            </label>
          </div>
          <button className="w-full text-right mt-1">
            <span className="text-[11px] text-gray-500 font-medium underline underline-offset-2">
              자세히보기
            </span>
          </button>
        </div>
      </div>

      <div className="mt-12">
        <button className="w-full rounded-xl bg-[#262835] py-4 text-[16px] font-bold text-white active:bg-[#1a1c25] transition-colors">
          문의 하기
        </button>
      </div>
    </>
  );
}
