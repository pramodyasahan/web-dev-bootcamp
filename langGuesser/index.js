// index.js

(async () => {
    const franc = await import('franc');
    const langs = await import('langs');

    const text = 'Alle menslike wesens word vry';
    const langCode = franc.franc(text);

    const language = langs.where('3', langCode)
    console.log(language.anme)
})();


