import { getDate } from '@quartz-community/utils/sort';
export { byDateAndAlphabetical } from '@quartz-community/utils/sort';
import { isFolderPath, resolveRelative, simplifySlug, getAllSegmentPrefixes } from '@quartz-community/utils/path';
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';
import { htmlToJsx } from '@quartz-community/utils/jsx';

// src/components/PageList.tsx
function byDateAndAlphabeticalFolderFirst(_cfg) {
  return (f1, f2) => {
    const f1IsFolder = isFolderPath(f1.slug ?? "");
    const f2IsFolder = isFolderPath(f2.slug ?? "");
    if (f1IsFolder && !f2IsFolder) return -1;
    if (!f1IsFolder && f2IsFolder) return 1;
    if (f1.dates && f2.dates) {
      return (getDate(f2)?.getTime() ?? 0) - (getDate(f1)?.getTime() ?? 0);
    } else if (f1.dates && !f2.dates) {
      return -1;
    } else if (!f1.dates && f2.dates) {
      return 1;
    }
    const f1Title = f1.frontmatter?.title?.toLowerCase() ?? "";
    const f2Title = f2.frontmatter?.title?.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  };
}
function DateDisplay({ date, locale }) {
  return /* @__PURE__ */ jsx("time", { dateTime: date.toISOString(), children: date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  }) });
}
var PageList = ({
  cfg,
  fileData,
  allFiles,
  limit,
  sort
}) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst();
  let list = [...allFiles].sort(sorter);
  if (limit) {
    list = list.slice(0, limit);
  }
  const fileSlug = fileData?.slug;
  return /* @__PURE__ */ jsx("ul", { class: "section-ul", children: list.map((page) => {
    const title = page.frontmatter?.title;
    const tags = page.frontmatter?.tags ?? [];
    return /* @__PURE__ */ jsx("li", { class: "section-li", children: /* @__PURE__ */ jsxs("div", { class: "section", children: [
      /* @__PURE__ */ jsx("p", { class: "meta", children: page.dates && getDate(page) && /* @__PURE__ */ jsx(
        DateDisplay,
        {
          date: getDate(page),
          locale: cfg?.locale ?? "en-US"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { class: "desc", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(
        "a",
        {
          href: resolveRelative(fileSlug ?? "", page.slug),
          class: "internal",
          children: title
        }
      ) }) }),
      /* @__PURE__ */ jsx("ul", { class: "tags", children: tags.map((tag) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        "a",
        {
          class: "internal tag-link",
          href: resolveRelative(
            fileSlug ?? "",
            `tags/${tag}`
          ),
          children: tag
        }
      ) })) })
    ] }) });
  }) });
};
PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`;

// src/i18n/locales/en-US.ts
var en_US_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag Index",
      itemsUnderTag: ({ count }) => count === 1 ? "1 item with this tag." : `${count} items with this tag.`,
      showingFirst: ({ count }) => `Showing first ${count} tags.`,
      totalTags: ({ count }) => `Found ${count} total tags.`
    }
  },
  components: {}
};

// src/i18n/locales/ar-SA.ts
var ar_SA_default = {
  pages: {
    tagContent: {
      tag: "\u0627\u0644\u0648\u0633\u0645",
      tagIndex: "\u0645\u0624\u0634\u0631 \u0627\u0644\u0648\u0633\u0645",
      itemsUnderTag: ({ count }) => count === 1 ? "\u064A\u0648\u062C\u062F \u0639\u0646\u0635\u0631 \u0648\u0627\u062D\u062F \u0641\u0642\u0637 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0648\u0633\u0645" : `\u064A\u0648\u062C\u062F ${count} \u0639\u0646\u0627\u0635\u0631 \u062A\u062D\u062A \u0647\u0630\u0627 \u0627\u0644\u0648\u0633\u0645.`,
      showingFirst: ({ count }) => `\u0625\u0638\u0647\u0627\u0631 \u0623\u0648\u0644 ${count} \u0623\u0648\u0633\u0645\u0629.`,
      totalTags: ({ count }) => `\u064A\u0648\u062C\u062F ${count} \u0623\u0648\u0633\u0645\u0629.`
    }
  },
  components: {}
};

// src/i18n/locales/ca-ES.ts
var ca_ES_default = {
  pages: {
    tagContent: {
      tag: "Etiqueta",
      tagIndex: "\xEDndex d'Etiquetes",
      itemsUnderTag: ({ count }) => count === 1 ? "1 article amb aquesta etiqueta." : `${count} article amb aquesta etiqueta.`,
      showingFirst: ({ count }) => `Mostrant les primeres ${count} etiquetes.`,
      totalTags: ({ count }) => `S'han trobat ${count} etiquetes en total.`
    }
  },
  components: {}
};

// src/i18n/locales/cs-CZ.ts
var cs_CZ_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Rejst\u0159\xEDk tag\u016F",
      itemsUnderTag: ({ count }) => count === 1 ? "1 polo\u017Eka s t\xEDmto tagem." : `${count} polo\u017Eek s t\xEDmto tagem.`,
      showingFirst: ({ count }) => `Zobrazuj\xED se prvn\xED ${count} tagy.`,
      totalTags: ({ count }) => `Nalezeno celkem ${count} tag\u016F.`
    }
  },
  components: {}
};

// src/i18n/locales/de-DE.ts
var de_DE_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag-\xDCbersicht",
      itemsUnderTag: ({ count }) => count === 1 ? "1 Datei mit diesem Tag." : `${count} Dateien mit diesem Tag.`,
      showingFirst: ({ count }) => `Die ersten ${count} Tags werden angezeigt.`,
      totalTags: ({ count }) => `${count} Tags insgesamt.`
    }
  },
  components: {}
};

// src/i18n/locales/en-GB.ts
var en_GB_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag Index",
      itemsUnderTag: ({ count }) => count === 1 ? "1 item with this tag." : `${count} items with this tag.`,
      showingFirst: ({ count }) => `Showing first ${count} tags.`,
      totalTags: ({ count }) => `Found ${count} total tags.`
    }
  },
  components: {}
};

// src/i18n/locales/es-ES.ts
var es_ES_default = {
  pages: {
    tagContent: {
      tag: "Etiqueta",
      tagIndex: "\xCDndice de Etiquetas",
      itemsUnderTag: ({ count }) => count === 1 ? "1 art\xEDculo con esta etiqueta." : `${count} art\xEDculos con esta etiqueta.`,
      showingFirst: ({ count }) => `Mostrando las primeras ${count} etiquetas.`,
      totalTags: ({ count }) => `Se han encontrado ${count} etiquetas en total.`
    }
  },
  components: {}
};

// src/i18n/locales/fa-IR.ts
var fa_IR_default = {
  pages: {
    tagContent: {
      tag: "\u0628\u0631\u0686\u0633\u0628",
      tagIndex: "\u0641\u0647\u0631\u0633\u062A \u0628\u0631\u0686\u0633\u0628\u200C\u0647\u0627",
      itemsUnderTag: ({ count }) => count === 1 ? "\u06CC\u06A9 \u0645\u0637\u0644\u0628 \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0631\u0686\u0633\u0628" : `${count} \u0645\u0637\u0644\u0628 \u0628\u0627 \u0627\u06CC\u0646 \u0628\u0631\u0686\u0633\u0628.`,
      showingFirst: ({ count }) => `\u062F\u0631 \u062D\u0627\u0644 \u0646\u0645\u0627\u06CC\u0634 ${count} \u0628\u0631\u0686\u0633\u0628.`,
      totalTags: ({ count }) => `${count} \u0628\u0631\u0686\u0633\u0628 \u06CC\u0627\u0641\u062A \u0634\u062F.`
    }
  },
  components: {}
};

// src/i18n/locales/fi-FI.ts
var fi_FI_default = {
  pages: {
    tagContent: {
      tag: "Tunniste",
      tagIndex: "Tunnisteluettelo",
      itemsUnderTag: ({ count }) => count === 1 ? "1 kohde t\xE4ll\xE4 tunnisteella." : `${count} kohdetta t\xE4ll\xE4 tunnisteella.`,
      showingFirst: ({ count }) => `N\xE4ytet\xE4\xE4n ensimm\xE4iset ${count} tunnistetta.`,
      totalTags: ({ count }) => `L\xF6ytyi yhteens\xE4 ${count} tunnistetta.`
    }
  },
  components: {}
};

// src/i18n/locales/fr-FR.ts
var fr_FR_default = {
  pages: {
    tagContent: {
      tag: "\xC9tiquette",
      tagIndex: "Index des \xE9tiquettes",
      itemsUnderTag: ({ count }) => count === 1 ? "1 \xE9l\xE9ment avec cette \xE9tiquette." : `${count} \xE9l\xE9ments avec cette \xE9tiquette.`,
      showingFirst: ({ count }) => `Affichage des premi\xE8res ${count} \xE9tiquettes.`,
      totalTags: ({ count }) => `Trouv\xE9 ${count} \xE9tiquettes au total.`
    }
  },
  components: {}
};

// src/i18n/locales/he-IL.ts
var he_IL_default = {
  pages: {
    tagContent: {
      tag: "\u05EA\u05D2\u05D9\u05EA",
      tagIndex: "\u05DE\u05E4\u05EA\u05D7 \u05D4\u05EA\u05D2\u05D9\u05D5\u05EA",
      itemsUnderTag: ({ count }) => count === 1 ? "\u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3 \u05E2\u05DD \u05EA\u05D2\u05D9\u05EA \u05D6\u05D5." : `${count} \u05E4\u05E8\u05D9\u05D8\u05D9\u05DD \u05E2\u05DD \u05EA\u05D2\u05D9\u05EA \u05D6\u05D5.`,
      showingFirst: ({ count }) => `\u05DE\u05E8\u05D0\u05D4 \u05D0\u05EA \u05D4-${count} \u05EA\u05D2\u05D9\u05D5\u05EA \u05D4\u05E8\u05D0\u05E9\u05D5\u05E0\u05D5\u05EA.`,
      totalTags: ({ count }) => `${count} \u05EA\u05D2\u05D9\u05D5\u05EA \u05E0\u05DE\u05E6\u05D0\u05D5 \u05E1\u05DA \u05D4\u05DB\u05DC.`
    }
  },
  components: {}
};

// src/i18n/locales/hu-HU.ts
var hu_HU_default = {
  pages: {
    tagContent: {
      tag: "C\xEDmke",
      tagIndex: "C\xEDmke index",
      itemsUnderTag: ({ count }) => `${count} elem tal\xE1lhat\xF3 ezzel a c\xEDmk\xE9vel.`,
      showingFirst: ({ count }) => `Els\u0151 ${count} c\xEDmke megjelen\xEDtve.`,
      totalTags: ({ count }) => `\xD6sszesen ${count} c\xEDmke tal\xE1lhat\xF3.`
    }
  },
  components: {}
};

// src/i18n/locales/id-ID.ts
var id_ID_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Indeks Tag",
      itemsUnderTag: ({ count }) => count === 1 ? "1 item dengan tag ini." : `${count} item dengan tag ini.`,
      showingFirst: ({ count }) => `Menampilkan ${count} tag pertama.`,
      totalTags: ({ count }) => `Ditemukan total ${count} tag.`
    }
  },
  components: {}
};

// src/i18n/locales/it-IT.ts
var it_IT_default = {
  pages: {
    tagContent: {
      tag: "Etichetta",
      tagIndex: "Indice etichette",
      itemsUnderTag: ({ count }) => count === 1 ? "1 oggetto con questa etichetta." : `${count} oggetti con questa etichetta.`,
      showingFirst: ({ count }) => count === 1 ? "Prima etichetta." : `Prime ${count} etichette.`,
      totalTags: ({ count }) => count === 1 ? "Trovata 1 etichetta in totale." : `Trovate ${count} etichette totali.`
    }
  },
  components: {}
};

// src/i18n/locales/ja-JP.ts
var ja_JP_default = {
  pages: {
    tagContent: {
      tag: "\u30BF\u30B0",
      tagIndex: "\u30BF\u30B0\u4E00\u89A7",
      itemsUnderTag: ({ count }) => `${count}\u4EF6\u306E\u30DA\u30FC\u30B8`,
      showingFirst: ({ count }) => `\u306E\u3046\u3061\u6700\u521D\u306E${count}\u4EF6\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059`,
      totalTags: ({ count }) => `\u5168${count}\u500B\u306E\u30BF\u30B0\u3092\u8868\u793A\u4E2D`
    }
  },
  components: {}
};

// src/i18n/locales/kk-KZ.ts
var kk_KZ_default = {
  pages: {
    tagContent: {
      tag: "\u0422\u0435\u0433",
      tagIndex: "\u0422\u0435\u0433\u0442\u0435\u0440 \u0438\u043D\u0434\u0435\u043A\u0441\u0456",
      itemsUnderTag: ({ count }) => count === 1 ? "\u0411\u04B1\u043B \u0442\u0435\u0433\u043F\u0435\u043D 1 \u044D\u043B\u0435\u043C\u0435\u043D\u0442." : `\u0411\u04B1\u043B \u0442\u0435\u0433\u043F\u0435\u043D ${count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442.`,
      showingFirst: ({ count }) => `\u0410\u043B\u0493\u0430\u0448\u049B\u044B ${count} \u0442\u0435\u0433 \u043A\u04E9\u0440\u0441\u0435\u0442\u0456\u043B\u0443\u0434\u0435.`,
      totalTags: ({ count }) => `\u0411\u0430\u0440\u043B\u044B\u0493\u044B ${count} \u0442\u0435\u0433 \u0442\u0430\u0431\u044B\u043B\u0434\u044B.`
    }
  },
  components: {}
};

// src/i18n/locales/ko-KR.ts
var ko_KR_default = {
  pages: {
    tagContent: {
      tag: "\uD0DC\uADF8",
      tagIndex: "\uD0DC\uADF8 \uBAA9\uB85D",
      itemsUnderTag: ({ count }) => `${count}\uAC74\uC758 \uD56D\uBAA9`,
      showingFirst: ({ count }) => `\uCC98\uC74C ${count}\uAC1C\uC758 \uD0DC\uADF8`,
      totalTags: ({ count }) => `\uCD1D ${count}\uAC1C\uC758 \uD0DC\uADF8\uB97C \uCC3E\uC558\uC2B5\uB2C8\uB2E4.`
    }
  },
  components: {}
};

// src/i18n/locales/lt-LT.ts
var lt_LT_default = {
  pages: {
    tagContent: {
      tag: "\u017Dyma",
      tagIndex: "\u017Dym\u0173 indeksas",
      itemsUnderTag: ({ count }) => count === 1 ? "1 elementas su \u0161ia \u017Eyma." : count < 10 ? `${count} elementai su \u0161ia \u017Eyma.` : `${count} element\u0173 su \u0161ia \u017Eyma.`,
      showingFirst: ({ count }) => count < 10 ? `Rodomos pirmosios ${count} \u017Eymos.` : `Rodomos pirmosios ${count} \u017Eym\u0173.`,
      totalTags: ({ count }) => count === 1 ? "Rasta i\u0161 viso 1 \u017Eyma." : count < 10 ? `Rasta i\u0161 viso ${count} \u017Eymos.` : `Rasta i\u0161 viso ${count} \u017Eym\u0173.`
    }
  },
  components: {}
};

// src/i18n/locales/nb-NO.ts
var nb_NO_default = {
  pages: {
    tagContent: {
      tag: "Tagg",
      tagIndex: "Tagg Indeks",
      itemsUnderTag: ({ count }) => count === 1 ? "1 gjenstand med denne taggen." : `${count} gjenstander med denne taggen.`,
      showingFirst: ({ count }) => `Viser f\xF8rste ${count} tagger.`,
      totalTags: ({ count }) => `Fant totalt ${count} tagger.`
    }
  },
  components: {}
};

// src/i18n/locales/nl-NL.ts
var nl_NL_default = {
  pages: {
    tagContent: {
      tag: "Label",
      tagIndex: "Label-index",
      itemsUnderTag: ({ count }) => count === 1 ? "1 item met dit label." : `${count} items met dit label.`,
      showingFirst: ({ count }) => count === 1 ? "Eerste label tonen." : `Eerste ${count} labels tonen.`,
      totalTags: ({ count }) => `${count} labels gevonden.`
    }
  },
  components: {}
};

// src/i18n/locales/pl-PL.ts
var pl_PL_default = {
  pages: {
    tagContent: {
      tag: "Znacznik",
      tagIndex: "Spis znacznik\xF3w",
      itemsUnderTag: ({ count }) => count === 1 ? "Oznaczony 1 element." : `Element\xF3w z tym znacznikiem: ${count}.`,
      showingFirst: ({ count }) => `Pokazuje ${count} pierwszych znacznik\xF3w.`,
      totalTags: ({ count }) => `Znalezionych wszystkich znacznik\xF3w: ${count}.`
    }
  },
  components: {}
};

// src/i18n/locales/pt-BR.ts
var pt_BR_default = {
  pages: {
    tagContent: {
      tag: "Tag",
      tagIndex: "Sum\xE1rio de Tags",
      itemsUnderTag: ({ count }) => count === 1 ? "1 item com esta tag." : `${count} items com esta tag.`,
      showingFirst: ({ count }) => `Mostrando as ${count} primeiras tags.`,
      totalTags: ({ count }) => `Encontradas ${count} tags.`
    }
  },
  components: {}
};

// src/i18n/locales/ro-RO.ts
var ro_RO_default = {
  pages: {
    tagContent: {
      tag: "Etichet\u0103",
      tagIndex: "Indexul etichetelor",
      itemsUnderTag: ({ count }) => count === 1 ? "1 articol cu aceast\u0103 etichet\u0103." : `${count} articole cu aceast\u0103 etichet\u0103.`,
      showingFirst: ({ count }) => `Se afi\u0219eaz\u0103 primele ${count} etichete.`,
      totalTags: ({ count }) => `Au fost g\u0103site ${count} etichete \xEEn total.`
    }
  },
  components: {}
};

// src/i18n/locales/ru-RU.ts
var ru_RU_default = {
  pages: {
    tagContent: {
      tag: "\u0422\u0435\u0433",
      tagIndex: "\u0418\u043D\u0434\u0435\u043A\u0441 \u0442\u0435\u0433\u043E\u0432",
      itemsUnderTag: ({ count }) => `\u0441 \u044D\u0442\u0438\u043C \u0442\u0435\u0433\u043E\u043C ${count} \u044D\u043B\u0435\u043C\u0435\u043D\u0442${getForm(count, "", "\u0430", "\u043E\u0432")}`,
      showingFirst: ({ count }) => `\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430${getForm(count, "\u0435\u0442\u0441\u044F", "\u044E\u0442\u0441\u044F", "\u044E\u0442\u0441\u044F")} ${count} \u0442\u0435\u0433${getForm(count, "", "\u0430", "\u043E\u0432")}`,
      totalTags: ({ count }) => `\u0412\u0441\u0435\u0433\u043E ${count} \u0442\u0435\u0433${getForm(count, "", "\u0430", "\u043E\u0432")}`
    }
  },
  components: {}
};
function getForm(number, form1, form2, form5) {
  const remainder100 = number % 100;
  const remainder10 = remainder100 % 10;
  if (remainder100 >= 10 && remainder100 <= 20) return form5;
  if (remainder10 > 1 && remainder10 < 5) return form2;
  if (remainder10 == 1) return form1;
  return form5;
}

// src/i18n/locales/th-TH.ts
var th_TH_default = {
  pages: {
    tagContent: {
      tag: "\u0E41\u0E17\u0E47\u0E01",
      tagIndex: "\u0E41\u0E17\u0E47\u0E01\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14",
      itemsUnderTag: ({ count }) => `\u0E21\u0E35 ${count} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E43\u0E19\u0E41\u0E17\u0E47\u0E01\u0E19\u0E35\u0E49`,
      showingFirst: ({ count }) => `\u0E41\u0E2A\u0E14\u0E07 ${count} \u0E41\u0E17\u0E47\u0E01\u0E41\u0E23\u0E01`,
      totalTags: ({ count }) => `\u0E21\u0E35\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14 ${count} \u0E41\u0E17\u0E47\u0E01`
    }
  },
  components: {}
};

// src/i18n/locales/tr-TR.ts
var tr_TR_default = {
  pages: {
    tagContent: {
      tag: "Etiket",
      tagIndex: "Etiket S\u0131ras\u0131",
      itemsUnderTag: ({ count }) => count === 1 ? "Bu etikete sahip 1 \xF6\u011Fe." : `Bu etiket alt\u0131ndaki ${count} \xF6\u011Fe.`,
      showingFirst: ({ count }) => `\u0130lk ${count} etiket g\xF6steriliyor.`,
      totalTags: ({ count }) => `Toplam ${count} adet etiket bulundu.`
    }
  },
  components: {}
};

// src/i18n/locales/uk-UA.ts
var uk_UA_default = {
  pages: {
    tagContent: {
      tag: "\u041C\u0456\u0442\u043A\u0430",
      tagIndex: "\u0406\u043D\u0434\u0435\u043A\u0441 \u043C\u0456\u0442\u043A\u0438",
      itemsUnderTag: ({ count }) => count === 1 ? "1 \u0435\u043B\u0435\u043C\u0435\u043D\u0442 \u0437 \u0446\u0456\u0454\u044E \u043C\u0456\u0442\u043A\u043E\u044E." : `\u0415\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432 \u0437 \u0446\u0456\u0454\u044E \u043C\u0456\u0442\u043A\u043E\u044E: ${count}.`,
      showingFirst: ({ count }) => `\u041F\u043E\u043A\u0430\u0437 \u043F\u0435\u0440\u0448\u0438\u0445 ${count} \u043C\u0456\u0442\u043E\u043A.`,
      totalTags: ({ count }) => `\u0412\u0441\u044C\u043E\u0433\u043E \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043C\u0456\u0442\u043E\u043A: ${count}.`
    }
  },
  components: {}
};

// src/i18n/locales/vi-VN.ts
var vi_VN_default = {
  pages: {
    tagContent: {
      tag: "Th\u1EBB",
      tagIndex: "Danh s\xE1ch th\u1EBB",
      itemsUnderTag: ({ count }) => `C\xF3 ${count} trang g\u1EAFn th\u1EBB n\xE0y.`,
      showingFirst: ({ count }) => `\u0110ang hi\u1EC3n th\u1ECB ${count} trang \u0111\u1EA7u ti\xEAn.`,
      totalTags: ({ count }) => `C\xF3 t\u1ED5ng c\u1ED9ng ${count} th\u1EBB.`
    }
  },
  components: {}
};

// src/i18n/locales/zh-CN.ts
var zh_CN_default = {
  pages: {
    tagContent: {
      tag: "\u6807\u7B7E",
      tagIndex: "\u6807\u7B7E\u7D22\u5F15",
      itemsUnderTag: ({ count }) => `\u6B64\u6807\u7B7E\u4E0B\u6709${count}\u6761\u7B14\u8BB0\u3002`,
      showingFirst: ({ count }) => `\u663E\u793A\u524D${count}\u4E2A\u6807\u7B7E\u3002`,
      totalTags: ({ count }) => `\u603B\u5171\u6709${count}\u4E2A\u6807\u7B7E\u3002`
    }
  },
  components: {}
};

// src/i18n/locales/zh-TW.ts
var zh_TW_default = {
  pages: {
    tagContent: {
      tag: "\u6A19\u7C64",
      tagIndex: "\u6A19\u7C64\u7D22\u5F15",
      itemsUnderTag: ({ count }) => `\u6B64\u6A19\u7C64\u4E0B\u6709 ${count} \u689D\u7B46\u8A18\u3002`,
      showingFirst: ({ count }) => `\u986F\u793A\u524D ${count} \u500B\u6A19\u7C64\u3002`,
      totalTags: ({ count }) => `\u7E3D\u5171\u6709 ${count} \u500B\u6A19\u7C64\u3002`
    }
  },
  components: {}
};

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "ar-SA": ar_SA_default,
  "ca-ES": ca_ES_default,
  "cs-CZ": cs_CZ_default,
  "de-DE": de_DE_default,
  "en-GB": en_GB_default,
  "es-ES": es_ES_default,
  "fa-IR": fa_IR_default,
  "fi-FI": fi_FI_default,
  "fr-FR": fr_FR_default,
  "he-IL": he_IL_default,
  "hu-HU": hu_HU_default,
  "id-ID": id_ID_default,
  "it-IT": it_IT_default,
  "ja-JP": ja_JP_default,
  "kk-KZ": kk_KZ_default,
  "ko-KR": ko_KR_default,
  "lt-LT": lt_LT_default,
  "nb-NO": nb_NO_default,
  "nl-NL": nl_NL_default,
  "pl-PL": pl_PL_default,
  "pt-BR": pt_BR_default,
  "ro-RO": ro_RO_default,
  "ru-RU": ru_RU_default,
  "th-TH": th_TH_default,
  "tr-TR": tr_TR_default,
  "uk-UA": uk_UA_default,
  "vi-VN": vi_VN_default,
  "zh-CN": zh_CN_default,
  "zh-TW": zh_TW_default
};
function i18n(locale) {
  return locales[locale] || en_US_default;
}

// src/components/styles/listPage.scss
var listPage_default = "ul.section-ul {\n  list-style: none;\n  margin-top: 2em;\n  padding-left: 0;\n}\n\nli.section-li {\n  margin-bottom: 1em;\n}\nli.section-li > .section {\n  display: grid;\n  grid-template-columns: fit-content(8em) 3fr 1fr;\n}\n@media all and (max-width: 600px) {\n  li.section-li > .section > .tags {\n    display: none;\n  }\n}\nli.section-li > .section > .desc > h3 > a {\n  background-color: transparent;\n}\nli.section-li > .section .meta {\n  margin: 0 1em 0 0;\n  opacity: 0.6;\n}\n\n.popover .section {\n  grid-template-columns: fit-content(8em) 1fr !important;\n}\n.popover .section > .tags {\n  display: none;\n}";
var defaultOptions = {
  numPages: 10
};
function concatenateResources(...resources) {
  const result = resources.filter((r) => r !== void 0).flat();
  return result.length === 0 ? void 0 : result;
}
var TagContent_default = ((opts) => {
  const options = { ...defaultOptions, ...opts };
  const TagContent = (props) => {
    const { tree, fileData, allFiles, cfg } = props;
    const fd = fileData;
    const slug = fd.slug;
    const locale = cfg?.locale ?? "en-US";
    if (!(slug?.startsWith("tags/") || slug === "tags")) {
      throw new Error(`Component "TagContent" tried to render a non-tag page: ${slug}`);
    }
    const tag = simplifySlug(slug.slice("tags/".length));
    const allPagesWithTag = (t) => allFiles.filter(
      (file) => (file.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes).includes(t)
    );
    const hastRoot = tree;
    const content = hastRoot.children.length === 0 ? fd.description : htmlToJsx(hastRoot);
    const cssClasses = fd.frontmatter?.cssclasses ?? [];
    const classes = cssClasses.join(" ");
    if (tag === "/") {
      const tags = [
        ...new Set(
          allFiles.flatMap((data) => data.frontmatter?.tags ?? []).flatMap(getAllSegmentPrefixes)
        )
      ].sort((a, b) => a.localeCompare(b));
      const tagItemMap = /* @__PURE__ */ new Map();
      for (const t of tags) {
        tagItemMap.set(t, allPagesWithTag(t));
      }
      return /* @__PURE__ */ jsxs("div", { class: "popover-hint", children: [
        /* @__PURE__ */ jsx("article", { class: classes, children: /* @__PURE__ */ jsx("p", { children: content }) }),
        /* @__PURE__ */ jsx("p", { children: i18n(locale).pages.tagContent.totalTags({ count: tags.length }) }),
        /* @__PURE__ */ jsx("div", { children: tags.map((t) => {
          const pages = tagItemMap.get(t);
          const listProps = {
            ...props,
            allFiles: pages
          };
          const pageListContent = PageList({
            ...listProps,
            limit: options.numPages,
            sort: options?.sort
          });
          const contentPage = allFiles.find(
            (file) => file.slug === `tags/${t}`
          );
          const root = contentPage?.filePath ? contentPage?.htmlAst : void 0;
          const tagDesc = !root || root.children.length === 0 ? contentPage?.description : htmlToJsx(root);
          const tagListingPage = `/tags/${t}`;
          const href = resolveRelative(slug, tagListingPage);
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("a", { class: "internal tag-link", href, children: t }) }),
            tagDesc && /* @__PURE__ */ jsx("p", { children: tagDesc }),
            /* @__PURE__ */ jsxs("div", { class: "page-listing", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                i18n(locale).pages.tagContent.itemsUnderTag({ count: pages.length }),
                pages.length > options.numPages && /* @__PURE__ */ jsxs(Fragment, { children: [
                  " ",
                  /* @__PURE__ */ jsx("span", { children: i18n(locale).pages.tagContent.showingFirst({
                    count: options.numPages
                  }) })
                ] })
              ] }),
              pageListContent
            ] })
          ] });
        }) })
      ] });
    } else {
      const pages = allPagesWithTag(tag);
      const listProps = {
        ...props,
        allFiles: pages
      };
      const pageListContent = PageList({
        ...listProps,
        sort: options?.sort
      });
      return /* @__PURE__ */ jsxs("div", { class: "popover-hint", children: [
        /* @__PURE__ */ jsx("article", { class: classes, children: content }),
        /* @__PURE__ */ jsxs("div", { class: "page-listing", children: [
          /* @__PURE__ */ jsx("p", { children: i18n(locale).pages.tagContent.itemsUnderTag({ count: pages.length }) }),
          /* @__PURE__ */ jsx("div", { children: pageListContent })
        ] })
      ] });
    }
  };
  TagContent.css = concatenateResources(listPage_default, PageList.css);
  return TagContent;
});

export { PageList, TagContent_default as TagContent, byDateAndAlphabeticalFolderFirst };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map