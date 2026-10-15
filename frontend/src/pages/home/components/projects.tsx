import Folder from "../../../components/folder";
import Text from "../../../components/text";
import Button from "../../../components/button";
import { useLanguage } from "../../../context/languageContext";

import folderImageWhite from "../../../assets/images/PastaBranca.png";
import folderImageMaroon from "../../../assets/images/PastaVermelha.png";
import folderImageBeige from "../../../assets/images/PastaBege.png";

import ornament from "../../../assets/images/OrnamentoProjetos.png";
import noiseSvg from "../../../assets/utils/noise-effect.svg";

const FOLDER_OVERLAP = "-mt-[43.75%]";

const CORNER_ORNAMENTS = [
  { box: "top-0 left-0 h-[179px] w-[172px]", rotate: "rotate-180" },
  { box: "top-0 right-0 h-[172px] w-[179px]", rotate: "-rotate-90" },
  { box: "bottom-[3px] -left-1 h-[172px] w-[179px]", rotate: "rotate-90" },
  { box: "right-1 bottom-[3px] h-[179px] w-[172px]", rotate: "" },
];

export default function Projects() {
  const { translations } = useLanguage();
  const t = translations.projects;

  const FOLDERS = [
    {
      label: t.folders.design,
      url: "/design",
      image: folderImageBeige,
    },
    {
      label: t.folders.productAndCode,
      url: "/produto-e-codigo",
      image: folderImageWhite,
    },
    {
      label: t.folders.playground,
      url: "/playground",
      image: folderImageMaroon,
    },
  ];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-jet px-30 pt-30 pb-30"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-50"
        style={{
          backgroundImage: `url("${noiseSvg}")`,
          backgroundSize: "200px 200px",
        }}
      />

      {CORNER_ORNAMENTS.map(({ box, rotate }) => (
        <div key={box} className={`pointer-events-none absolute z-10 ${box}`}>
          <img
            src={ornament}
            alt=""
            className={`absolute top-1/2 left-1/2 h-[179px] w-[172px] max-w-none -translate-x-1/2 -translate-y-1/2 ${rotate}`}
          />
        </div>
      ))}

      <div className="relative z-25 flex items-center gap-33">
        <div className="ml-[151px] flex min-w-0 flex-[0_1_900px] flex-col">
          {FOLDERS.map((folder, index) => (
            <div
              key={folder.label}
              className={`relative w-full [&>*]:block [&>*]:w-full [&_img]:block [&_img]:h-auto [&_img]:w-full ${
                index > 0 ? FOLDER_OVERLAP : ""
              }`}
              style={{ zIndex: index + 1 }}
            >
              <Folder
                imageUrl={folder.image}
                imageAlt={`${t.folderAltPrefix} ${folder.label}`}
                url={folder.url}
              >
                {folder.label}
              </Folder>
            </div>
          ))}
        </div>

        <div className="flex min-w-[277px] flex-1 flex-col items-end">
          <Text
            as="h2"
            variant="subtitle"
            className="text-right whitespace-nowrap text-white!"
          >
            {t.titleLine1}
            <br />
            {t.titleLine2}
            <br />
            {t.titleLine3}
            <br />
            {t.titleLine4}
          </Text>

          <Text
            as="p"
            variant="body-normal"
            className="mt-16 block w-[277px] max-w-full text-justify text-white!"
          >
            {t.description}
          </Text>

          <Button type="button" variant="outline-white" className="mt-9">
            {t.viewArchiveButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
