/**
 * Gini Health: Waitlist → Google Sheets
 * Reçoit les inscriptions (POST depuis index.html) et les ajoute / met à jour
 * dans la feuille "Signups".
 *
 * Le formulaire envoie en 2 temps :
 *   1) email + firstName (+ ref de parrainage)        -> crée la ligne
 *   2) email + reason (le qualifier choisi ensuite)   -> complète la même ligne
 *
 * ⚠️ Après avoir collé ce code : Enregistrer, puis
 *    Déployer > Gérer les déploiements > ✏️ > Version : Nouvelle version > Déployer.
 *    (L'URL /exec reste la même.)
 */

const SHEET_NAME = 'Signups';
const HEADERS = ['Date', 'Email', 'First Name', 'Reason', 'Referred By', 'User Agent'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000); // évite les écritures concurrentes

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const p = (e && e.parameter) ? e.parameter : {};
    const email     = p.email     ? String(p.email).trim().toLowerCase() : '';
    const firstName = p.firstName ? String(p.firstName).trim()           : '';
    const reason    = p.reason    ? String(p.reason).trim()              : '';
    const ref       = p.ref       ? String(p.ref).trim()                 : '';
    const ua        = p.ua        ? String(p.ua)                         : '';

    if (!email) return json({ ok: false, error: 'no email' });

    // Cherche une ligne existante par email (colonne 2)
    const lastRow = sheet.getLastRow();
    let rowIndex = -1;
    if (lastRow > 1) {
      const emails = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (let i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) { rowIndex = i + 2; break; }
      }
    }

    if (rowIndex === -1) {
      // Nouvelle inscription
      sheet.appendRow([new Date(), email, firstName, reason, ref, ua]);
      return json({ ok: true, created: true });
    }

    // Ligne existante : on ne remplit que ce qui est fourni (sans écraser à vide)
    if (firstName && !sheet.getRange(rowIndex, 3).getValue()) sheet.getRange(rowIndex, 3).setValue(firstName);
    if (reason)                                               sheet.getRange(rowIndex, 4).setValue(reason);
    if (ref && !sheet.getRange(rowIndex, 5).getValue())       sheet.getRange(rowIndex, 5).setValue(ref);
    return json({ ok: true, updated: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Nombre de places fondatrices (pour la barre de progression)
const GOAL = 500;

// GET : renvoie le compteur d'inscrites (pour la barre + la position en file).
// Supporte le JSONP (?callback=...) pour être lisible côté navigateur malgré le CORS.
function doGet(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const payload = { ok: true, count: getCount(), goal: GOAL, message: 'Gini Health waitlist endpoint actif' };
  if (p.callback) {
    return ContentService
      .createTextOutput(p.callback + '(' + JSON.stringify(payload) + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return json(payload);
}

// Nombre d'inscrites = nombre de lignes - l'en-tête
function getCount() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return 0;
  return Math.max(0, sheet.getLastRow() - 1);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
