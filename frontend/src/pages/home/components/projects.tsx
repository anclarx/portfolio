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
  { box: "top-0 left-0 h-[11.1875rem] w-[10.75rem]", rotate: "rotate-180" },
  { box: "top-0 right-0 h-[10.75rem] w-[11.1875rem]", rotate: "-rotate-90" },
  {
    box: "bottom-[0.1875rem] -left-[0.25rem] h-[10.75rem] w-[11.1875rem]",
    rotate: "rotate-90",
  },
  {
    box: "right-[0.25rem] bottom-[0.1875rem] h-[11.1875rem] w-[10.75rem]",
    rotate: "",
  },
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
      className="relative overflow-hidden bg-jet p-section"
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
            className={`absolute top-1/2 left-1/2 h-[11.1875rem] w-[10.75rem] max-w-none -translate-x-1/2 -translate-y-1/2 ${rotate}`}
          />
        </div>
      ))}

      <div className="relative z-25 flex items-center gap-[8.25rem]">
        <div className="ml-[9.4375rem] flex min-w-0 flex-[0_1_900px] flex-col">
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

        <div className="flex min-w-[17.3125rem] flex-1 flex-col items-end">
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
            className="mt-2xl block w-[17.3125rem] max-w-full text-justify text-white!"
          >
            {t.description}
          </Text>

          <Button type="button" variant="outline-white" className="mt-md">
            {t.viewArchiveButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
