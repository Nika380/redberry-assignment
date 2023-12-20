import ExitIcon from "@/components/ExitIcon";
import HeaderComponent from "@/components/HeaderComponent";
import SelectComponent from "@/components/SelectComponent";
import UploadImageComponent from "@/components/UploadImageComponent";

export default function Index({ children }: any) {
  return (
    <>
      <HeaderComponent />
      <UploadImageComponent />
      <SelectComponent />
    </>
  );
}
