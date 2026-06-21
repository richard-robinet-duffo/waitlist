/**
 * Gini Health — Waitlist → Google Sheets
 * Reçoit les inscriptions (POST depuis index.html) et les ajoute à la feuille.
 *
 * Installation :
 *   1. Crée une Google Sheet (sheets.new).
 *   2. Menu Extensions > Apps Script. Colle TOUT ce fichier (remplace le contenu).
 *   3. Déployer > Nouveau déploiement > type "Application Web".
 *        - Exécuter en tant que : Moi
 *        - Qui a accès        : Tout le monde
 *   4. Autorise l'accès quand Google le demande.
 *   5. Copie l'URL de l'app Web (se termine par /exec) -> donne-la à Claude.
 */

const SHEET_NAME = 'Signups';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // évite les écritures concurrentes

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    // En-têtes si la feuille est vide
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date', 'Email', 'User Agent']);
    }

    const email = (e && e.parameter && e.parameter.email)
      ? String(e.parameter.email).trim().toLowerCase()
      : '';
    const ua = (e && e.parameter && e.parameter.ua) ? String(e.parameter.ua) : '';

    if (!email) {
      return json({ ok: false, error: 'no email' });
    }

    // Anti-doublon : ne ré-ajoute pas un email déjà présent
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
      if (existing.indexOf(email) !== -1) {
        return json({ ok: true, duplicate: true });
      }
    }

    sheet.appendRow([new Date(), email, ua]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Permet de tester l'URL dans le navigateur
function doGet() {
  return json({ ok: true, message: 'Gini Health waitlist endpoint actif' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
