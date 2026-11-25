"use client";
import { useActionState, useState, type ReactNode } from "react";
import { tourScreenIds, type AboutContent, type ContactContent, type FlagshipContent, type HeroContent, type SeoContent, type TourScreenId } from "@/lib/content/schema";
import { saveContent, type ActionState } from "../actions";
import { FormStatus, LinesField, ListField, Repeater, SelectField, SubmitButton, TextField, cleanList } from "./FormBits";
import styles from "../admin.module.css";

const initial: ActionState = { ok: false, message: "" };
const saveHero = saveContent.bind(null, "hero");
const saveAbout = saveContent.bind(null, "about");
const saveContact = saveContent.bind(null, "contact");
const saveSeo = saveContent.bind(null, "seo");
const saveFlagship = saveContent.bind(null, "flagship");

const tourScreenLabels: Record<TourScreenId, string> = {
  pools: "Dosya havuzları",
  address: "Adres araştırma merdiveni",
  operations: "Toplu gönderim",
  monitoring: "Canlı izleme",
  overview: "Genel bakış",
};

function SectionForm({ title, description, action, state, payload, children }: {
  title: string;
  description?: string;
  action: (formData: FormData) => void;
  state: ActionState;
  payload: unknown;
  children: ReactNode;
}) {
  return (
    <form action={action} className={styles.card + " " + styles.form}>
      <div>
        <h2 className={styles.cardTitle} style={{ marginBottom: 4 }}>{title}</h2>
        {description && <p className={styles.hint}>{description}</p>}
      </div>
      <input type="hidden" name="payload" value={JSON.stringify(payload)} />
      {children}
      <div className={styles.formActions}>
        <FormStatus state={state} />
        <SubmitButton />
      </div>
    </form>
  );
}

export function HeroForm({ initialValue }: { initialValue: HeroContent }) {
  const [value, setValue] = useState(initialValue);
  const [state, action] = useActionState(saveHero, initial);
  const set = <K extends keyof HeroContent>(key: K) => (next: HeroContent[K]) => setValue(current => ({ ...current, [key]: next }));
  return (
    <SectionForm title="Giriş (hero)" description="Sayfanın ilk ekranı: kim olduğun ve ne yaptığın." action={action} state={state} payload={{ ...value, stack: cleanList(value.stack) }}>
      <div className={styles.grid2}>
        <TextField label="Ad soyad" value={value.name} onChange={set("name")} maxLength={60} />
        <TextField label="Unvan" value={value.role} onChange={set("role")} maxLength={60} />
      </div>
      <TextField label="Ana başlık" value={value.headline} onChange={set("headline")} maxLength={120} hint="Virgülden sonraki kısım sarı vurguyla gösterilir." />
      <TextField label="Alt metin" value={value.subheadline} onChange={set("subheadline")} multiline maxLength={420} />
      <div className={styles.inline}>
        <label className={styles.check}>
          <input type="checkbox" checked={value.available} onChange={event => set("available")(event.target.checked)} />
          Yeni projelere açığım
        </label>
        <TextField label="Müsaitlik metni" value={value.availabilityText} onChange={set("availabilityText")} maxLength={60} />
      </div>
      <ListField label="Teknoloji şeridi" value={value.stack} onChange={set("stack")} hint="Hero'nun altındaki kayan şerit. Virgülle ayır." />
    </SectionForm>
  );
}

export function AboutForm({ initialValue }: { initialValue: AboutContent }) {
  const [value, setValue] = useState(initialValue);
  const [state, action] = useActionState(saveAbout, initial);
  const set = <K extends keyof AboutContent>(key: K) => (next: AboutContent[K]) => setValue(current => ({ ...current, [key]: next }));
  const payload = { ...value, skills: value.skills.map(group => ({ ...group, items: cleanList(group.items) })) };
  return (
    <SectionForm title="Hakkımda" action={action} state={state} payload={payload}>
      <TextField label="Başlık" value={value.title} onChange={set("title")} maxLength={140} />
      <TextField label="Metin" value={value.body} onChange={set("body")} multiline rows={8} maxLength={2000} hint="Paragrafları boş bir satırla ayır." />
      <div className={styles.field}>
        <span className={styles.label}>Çalışma prensipleri</span>
        <Repeater
          items={value.principles}
          onChange={set("principles")}
          create={() => ({ title: "", text: "" })}
          addLabel="Prensip ekle"
          max={4}
          itemLabel={(item, index) => `${index + 1}. ${item.title || "Yeni prensip"}`}
          render={(item, update) => (
            <>
              <TextField label="Başlık" value={item.title} onChange={title => update({ ...item, title })} maxLength={60} />
              <TextField label="Açıklama" value={item.text} onChange={text => update({ ...item, text })} multiline rows={2} maxLength={220} />
            </>
          )}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Yetenek grupları</span>
        <Repeater
          items={value.skills}
          onChange={set("skills")}
          create={() => ({ title: "", items: [] })}
          addLabel="Grup ekle"
          max={6}
          itemLabel={(item, index) => `${index + 1}. ${item.title || "Yeni grup"}`}
          render={(item, update) => (
            <div className={styles.inline}>
              <TextField label="Grup adı" value={item.title} onChange={title => update({ ...item, title })} maxLength={40} />
              <ListField label="Teknolojiler" value={item.items} onChange={items => update({ ...item, items })} />
            </div>
          )}
        />
      </div>
    </SectionForm>
  );
}

export function ContactForm({ initialValue }: { initialValue: ContactContent }) {
  const [value, setValue] = useState(initialValue);
  const [state, action] = useActionState(saveContact, initial);
  // Yüklenen CV'nin adresi sunucuda belirlenir; kayıttan sonra formdaki değer güncellenir.
  const [handled, setHandled] = useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state.ok && state.value) setValue(state.value as ContactContent);
  }
  const set = <K extends keyof ContactContent>(key: K) => (next: ContactContent[K]) => setValue(current => ({ ...current, [key]: next }));
  return (
    <SectionForm title="İletişim" description="Sayfanın sonundaki iletişim bölümü ve alt bilgideki bağlantılar." action={action} state={state} payload={value}>
      <TextField label="Başlık" value={value.title} onChange={set("title")} maxLength={120} />
      <TextField label="Metin" value={value.text} onChange={set("text")} multiline rows={2} maxLength={300} />
      <div className={styles.grid2}>
        <TextField label="E-posta" type="email" value={value.email} onChange={set("email")} />
        <TextField label="Konum" value={value.location} onChange={set("location")} maxLength={60} />
        <TextField label="GitHub" type="url" value={value.github} onChange={set("github")} />
        <TextField label="LinkedIn" type="url" value={value.linkedin} onChange={set("linkedin")} hint="Boş bırakırsan gösterilmez." />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>CV</span>
        {value.cvUrl ? (
          <p className={styles.hint}>
            Yayında: <a href={value.cvUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>{value.cvUrl.split("/").pop()}</a>{" "}
            <button type="button" className={styles.button} style={{ marginLeft: 8 }} onClick={() => set("cvUrl")("")}>Kaldır</button>
          </p>
        ) : (
          <p className={styles.hint}>Yüklü CV yok; sitede &quot;CV talep et&quot; bağlantısı e-posta taslağı açar.</p>
        )}
        <input type="file" name="cvFile" accept="application/pdf" aria-label="CV yükle (PDF)" />
        <p className={styles.hint}>PDF, en fazla 4 MB. Yüklediğinde sitede &quot;CV&apos;yi indir&quot; bağlantısı çıkar. Telefon numarası gibi bilgileri herkese açık paylaşmak istemiyorsan yüklemeden bırak.</p>
      </div>
    </SectionForm>
  );
}

export function SeoForm({ initialValue }: { initialValue: SeoContent }) {
  const [value, setValue] = useState(initialValue);
  const [state, action] = useActionState(saveSeo, initial);
  return (
    <SectionForm title="Arama motoru ve paylaşım" description="Google sonuçlarında ve bağlantı paylaşıldığında görünen başlık ve açıklama." action={action} state={state} payload={value}>
      <TextField label="Sayfa başlığı" value={value.title} onChange={title => setValue({ ...value, title })} maxLength={70} hint={`${value.title.length}/70`} />
      <TextField label="Açıklama" value={value.description} onChange={description => setValue({ ...value, description })} multiline rows={3} maxLength={200} hint={`${value.description.length}/200`} />
    </SectionForm>
  );
}

export function FlagshipForm({ initialValue }: { initialValue: FlagshipContent }) {
  const [value, setValue] = useState(initialValue);
  const [state, action] = useActionState(saveFlagship, initial);
  const set = <K extends keyof FlagshipContent>(key: K) => (next: FlagshipContent[K]) => setValue(current => ({ ...current, [key]: next }));
  const payload = {
    ...value,
    pillars: cleanList(value.pillars),
    techStack: value.techStack.map(item => ({ name: item.name.trim(), role: item.role.trim() })).filter(item => item.name || item.role),
    tour: value.tour.map(step => ({ ...step, points: cleanList(step.points) })),
  };
  return (
    <SectionForm title="Ana proje" description="İşler bölümündeki büyük kart ve açılan vaka çalışması penceresi. Hero'daki rakamlar da buradan gelir." action={action} state={state} payload={payload}>
      <div className={styles.grid2}>
        <TextField label="Üst etiket" value={value.eyebrow} onChange={set("eyebrow")} maxLength={40} />
        <TextField label="Rol" value={value.role} onChange={set("role")} maxLength={80} />
      </div>
      <TextField label="Proje adı" value={value.title} onChange={set("title")} maxLength={120} />
      <TextField label="Kart metni" value={value.tagline} onChange={set("tagline")} maxLength={160} hint={`Kartta başlığın altındaki kısa metin. ${value.tagline.length}/160`} />
      <TextField label="Özet" value={value.summary} onChange={set("summary")} multiline rows={3} maxLength={400} />
      <TextField label="Üstlendiğin sorumluluk" value={value.ownership} onChange={set("ownership")} multiline rows={4} maxLength={800} />
      <ListField label="Öne çıkan başlıklar" value={value.pillars} onChange={set("pillars")} hint="Detay penceresinde etiket olarak gösterilir, en fazla 4." />
      <div className={styles.field}>
        <span className={styles.label}>Rakamlar</span>
        <Repeater
          items={value.metrics}
          onChange={set("metrics")}
          create={() => ({ value: "", label: "" })}
          addLabel="Rakam ekle"
          max={4}
          itemLabel={(item, index) => `${index + 1}. ${item.value || "Yeni rakam"}`}
          render={(item, update) => (
            <div className={styles.inline}>
              <TextField label="Değer" value={item.value} onChange={next => update({ ...item, value: next })} maxLength={16} placeholder="100.000+" />
              <TextField label="Açıklama" value={item.label} onChange={label => update({ ...item, label })} maxLength={60} />
            </div>
          )}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Mimari ve teknolojiler</span>
        <p className={styles.hint}>Mimari ve teknolojiler penceresindeki şema ve liste. Şemanın kendisi sabittir; başlığı, metni ve listeyi buradan değiştirirsin.</p>
        <TextField label="Başlık" value={value.architectureTitle} onChange={set("architectureTitle")} maxLength={120} />
        <TextField label="Metin" value={value.architectureText} onChange={set("architectureText")} multiline rows={3} maxLength={500} hint={`${value.architectureText.length}/500`} />
        <Repeater
          items={value.techStack}
          onChange={set("techStack")}
          create={() => ({ name: "", role: "" })}
          addLabel="Teknoloji ekle"
          max={12}
          itemLabel={(item, index) => `${index + 1}. ${item.name || "Yeni teknoloji"}`}
          render={(item, update) => (
            <div className={styles.inline}>
              <TextField label="Ad" value={item.name} onChange={name => update({ ...item, name })} maxLength={30} placeholder="Redis" />
              <TextField label="Projedeki görevi" value={item.role} onChange={role => update({ ...item, role })} maxLength={90} placeholder="Önbellek ve işlem kilitleri" />
            </div>
          )}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Ekran turu</span>
        <p className={styles.hint}>Ana proje kartındaki hareketli ekranlar. Ekranlar yeniden çizilmiştir ve yalnızca örnek veri içerir; burada yalnızca sırasını ve yanındaki metni değiştirirsin.</p>
        <Repeater
          items={value.tour}
          onChange={set("tour")}
          create={() => ({ screen: "pools" as TourScreenId, title: "", text: "", points: [] })}
          addLabel="Adım ekle"
          max={6}
          itemLabel={(step, index) => `${index + 1}. ${tourScreenLabels[step.screen]}`}
          render={(step, update) => (
            <>
              <div className={styles.inline}>
                <SelectField label="Ekran" value={step.screen} onChange={screen => update({ ...step, screen })} options={tourScreenIds.map(id => ({ value: id, label: tourScreenLabels[id] }))} />
                <TextField label="Başlık" value={step.title} onChange={title => update({ ...step, title })} maxLength={80} />
              </div>
              <TextField label="Ekran açıklaması" value={step.text} onChange={text => update({ ...step, text })} multiline rows={3} maxLength={320} hint="Ekran okuyucular için; sayfada görünmez." />
              <LinesField label="Maddeler" value={step.points} onChange={points => update({ ...step, points })} hint="Her satıra bir madde, en fazla 4." />
            </>
          )}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Vaka çalışması bölümleri</span>
        <Repeater
          items={value.sections}
          onChange={set("sections")}
          create={() => ({ label: "", title: "", description: "", items: [] })}
          addLabel="Bölüm ekle"
          max={10}
          itemLabel={(section, index) => `${String(index + 1).padStart(2, "0")}. ${section.label || "Yeni bölüm"}`}
          render={(section, update) => (
            <>
              <div className={styles.inline}>
                <TextField label="Kısa etiket" value={section.label} onChange={label => update({ ...section, label })} maxLength={40} />
                <TextField label="Başlık" value={section.title} onChange={title => update({ ...section, title })} maxLength={120} />
              </div>
              <TextField label="Açıklama" value={section.description} onChange={description => update({ ...section, description })} multiline rows={2} maxLength={400} />
              <Repeater
                items={section.items}
                onChange={items => update({ ...section, items })}
                create={() => ({ title: "", description: "" })}
                addLabel="Madde ekle"
                max={6}
                itemLabel={(item, index) => `Madde ${index + 1}${item.title ? ": " + item.title : ""}`}
                render={(item, updateItem) => (
                  <>
                    <TextField label="Madde başlığı" value={item.title} onChange={title => updateItem({ ...item, title })} maxLength={90} />
                    <TextField label="Madde açıklaması" value={item.description} onChange={description => updateItem({ ...item, description })} multiline rows={2} maxLength={400} />
                  </>
                )}
              />
            </>
          )}
        />
      </div>
    </SectionForm>
  );
}
