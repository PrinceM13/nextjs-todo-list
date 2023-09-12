import { Hourglass } from "react-loader-spinner";

export default function HourGlass(): JSX.Element {
  return (
    <>
      {/* background */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* spinner */}
      {/* modal */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white flex flex-col justify-center items-center gap-4 rounded-lg px-10 pt-6 pb-4">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
          <div className="text-center font-bold text-lg text-[#306cce]">Loading...</div>
        </div>
      </div>
    </>
  );
}
