import { QtspClause } from "../../../../../definitions/fci/QtspClause";
import { QtspClausesMetadata } from "../../../../../definitions/fci/QtspClausesMetadata";

export const mockQtspClausesMetadata: QtspClausesMetadata = {
  clauses: [
    {
      text: "(1) Io sottoscritto/a dichiaro quanto indicato nel [QUADRO E - AUTOCERTIFICAZIONE E SOTTOSCRIZIONE DA PARTE DEL TITOLARE.](@DOCUMENT_URL)"
    } as QtspClause,
    {
      text: "(2) Io sottoscritto/a accetto le Condizioni Generali di Contratto ([Mod.NAM CA01](https://fakeqtspurl.com)) e le clausole vessatorie riportate nel [QUADRO F – CLAUSOLE VESSATORIE](@DOCUMENT_URL)"
    } as QtspClause,
    {
      text: "(3) Io sottoscritto/a acconsento al trattamento dei dati personali come specificato nel [QUADRO G - CONSENSO AL TRATTAMENTO DEI DATI PERSONALI](@DOCUMENT_URL)"
    } as QtspClause
  ],
  document_url:
    "https://pagopa.demo.bit4id.org/static/docs/modulo_richiesta_V1.pdf",
  nonce: "",
  privacy_url: "https://docs.namirialtsp.com/documents/Mod_NAM_GDPR03D_ITA.pdf",
  privacy_text: "Confermo di avere letto l'Informativa Privacy.",
  terms_and_conditions_url:
    "https://docs.namirialtsp.com/documents/Mod_NAM_CA01D_ITA.pdf"
};
