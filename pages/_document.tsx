import { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'

export default function Document(_props: DocumentProps) {
  return (
    <Html lang="nl">
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2DP92KLE3B"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', 'G-2DP92KLE3B');
        `}} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
            "@context": {"name": {"@id": "http://xmlns.com/foaf/0.1/name","@language": "en"},"age": {"@id": "http://xmlns.com/foaf/0.1/age","@type": "http://www.w3.org/2001/XMLSchema#integer"},"worksFor": "http://schema.org/worksFor","knowsAbout": "http://schema.org/knowsAbout","jobTitle": "http://schema.org/jobTitle","knows": {"@id": "http://xmlns.com/foaf/0.1/knows","@type": "@id"},"attendee": {"@id": "http://schema.org/attendee","@type": "@id"},"startDate": {"@id": "http://schema.org/startDate","@type": "http://www.w3.org/2001/XMLSchema#date"}},"@id": "https://ginfinai.be/#me","@type": "http://schema.org/Person","name": "Gerben Ceuppens","age": 23,"worksFor": {"@id":"https://aisquare.be/","@type": "http://schema.org/Organization","name": "AI Square"},"knowsAbout": "GraphRAG","jobTitle": "Student MSc Computer Science Engineering","attendee": {"@id": "https://pietercolpaert.be/teaching/kg/#2024-2025","@type": "http://schema.org/CourseInstance","startDate": "2025-02-14"},"knows": [ "https://sandervandamme.com#me", "https://lynnvkerckhove.github.io/graphPub/docs/LynnVK.ttl#me", "https://bavop.github.io/rep/#me" ] }`}} />
      </Head>
      <body>
        <Main />
        <NextScript />

        <script src="https://d2mpatx37cqexb.cloudfront.net/delightchat-whatsapp-widget/embeds/embed.min.js" async></script>
        <script dangerouslySetInnerHTML={{ __html: `
          var wa_btnSetting = {"btnColor":"#16BE45","ctaText":"","cornerRadius":40,"marginBottom":20,"marginLeft":20,"marginRight":20,"btnPosition":"right","whatsAppNumber":"32498420178","welcomeMessage":"Hallo!\\nHoe kan ik u helpen?","zIndex":999999,"btnColorScheme":"light"};
          var wa_widgetSetting = {"title":"GinfinAI","subTitle":"Antwoord normaal gezien binnen de dag","headerBackgroundColor":"#807ad0","headerColorScheme":"light","greetingText":"Hallo! \\n+Hoe kan ik u helpen?","ctaText":"Stuur een bericht","btnColor":"#807AD0","cornerRadius":40,"welcomeMessage":"Hello","btnColorScheme":"light","brandImage":"/images/Ginfinai_small_nobg.png","darkHeaderColorScheme":{"title":"#333333","subTitle":"#4F4F4F"}};  
          window.onload = function(){ if(window._waEmbed) _waEmbed(wa_btnSetting, wa_widgetSetting); };
        `}} />
      </body>
    </Html>
  )
}
