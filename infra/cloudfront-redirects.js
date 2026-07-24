// CloudFront Function (runtime cloudfront-js-2.0), event type: viewer-request
// Dystrybucja: E3BHDI3E6KXQAJ  (www.grandkuchnie.pl)
//
// Dwie reguły:
//   1) /miasto/torun[/]  -> 301 na /
//      Toruń to siedziba firmy; treść lokalna została przeniesiona na stronę główną,
//      bo obie strony kanibalizowały się na „kuchnie na wymiar toruń"
//      (GSC 28 dni: / poz. 13,9 przy 56 wyśw. vs /miasto/torun/ poz. 41,0 przy 55 wyśw.).
//   2) brak końcowego slasha na ścieżce „katalogowej" -> 301 na wersję ze slashem.
//      S3 website endpoint robi to sam, ale zwraca 302 (tymczasowe), przez co warianty
//      bez slasha krążą w indeksie zamiast się skonsolidować.
//
// UWAGA PRZY WDROŻENIU: deploy.sh robi `aws s3 sync --delete`, więc po pierwszym
// deployu bez tej funkcji /miasto/torun/ zwróci 404, a nie 301. Publikuj funkcję
// i podepnij ją do dystrybucji ZANIM wypchniesz build usuwający tę podstronę.

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // --- 1) skasowana podstrona miejska Torunia -> strona główna
  if (uri === '/miasto/torun' || uri === '/miasto/torun/') {
    return redirect('/');
  }

  // --- 2) brakujący końcowy slash
  // Pomijamy: katalog główny, ścieżki już zakończone slashem oraz pliki
  // (ostatni segment zawiera kropkę, np. /robots.txt, /_assets/app.js).
  if (uri !== '/' && !endsWithSlash(uri) && !lastSegmentHasDot(uri)) {
    return redirect(uri + '/' + queryString(request));
  }

  return request;
}

function redirect(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      location: { value: location },
      'cache-control': { value: 'max-age=3600' },
    },
  };
}

function endsWithSlash(uri) {
  return uri.charAt(uri.length - 1) === '/';
}

function lastSegmentHasDot(uri) {
  var lastSegment = uri.slice(uri.lastIndexOf('/') + 1);
  return lastSegment.indexOf('.') !== -1;
}

// CloudFront Functions dostają querystring jako obiekt {klucz: {value}} lub
// {klucz: {multiValue: [{value}, ...]}} — trzeba go złożyć z powrotem ręcznie,
// inaczej przekierowanie zjada parametry (m.in. utm_source, które ContactForm.tsx
// zbiera i wysyła do /lead).
function queryString(request) {
  var qs = request.querystring;
  var parts = [];

  for (var key in qs) {
    var entry = qs[key];
    if (entry.multiValue) {
      for (var i = 0; i < entry.multiValue.length; i++) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(entry.multiValue[i].value));
      }
    } else if (entry.value === '') {
      parts.push(encodeURIComponent(key));
    } else {
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(entry.value));
    }
  }

  return parts.length ? '?' + parts.join('&') : '';
}
