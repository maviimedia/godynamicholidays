import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate, Link } from "react-router-dom";

export default function CreatePackage() {
  const navigate = useNavigate();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createTrip = useMutation(api.trips.createTrip);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    days: 0,
    nights: 0,
    newPrice: 0,
    oldPrice: 0,
    isTrending: false,
    route: [""],
    highlights: [""],
    inclusions: [""],
    exclusions: [""],
    thingsToCarry: [""],
    faqs: [{ question: "", answer: "" }]
  });

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNumberChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleFaqChange = (index, key, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index][key] = value;
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addFaq = () => {
    setFormData({ ...formData, faqs: [...formData.faqs, { question: "", answer: "" }] });
  };

  const removeFaq = (index) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
  };

  const uploadFile = async (file) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await result.json();
    return storageId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mainImageFile) {
      alert("Main image is required.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const mainImageId = await uploadFile(mainImageFile);
      
      const galleryImagesIds = [];
      for (const file of galleryFiles) {
        const id = await uploadFile(file);
        galleryImagesIds.push(id);
      }

      await createTrip({
        title: formData.title,
        slug: formData.slug,
        duration: { days: formData.days, nights: formData.nights },
        route: formData.route.filter(item => item.trim() !== ""),
        highlights: formData.highlights.filter(item => item.trim() !== ""),
        inclusions: formData.inclusions.filter(item => item.trim() !== ""),
        exclusions: formData.exclusions.filter(item => item.trim() !== ""),
        thingsToCarry: formData.thingsToCarry.filter(item => item.trim() !== ""),
        faqs: formData.faqs.filter(faq => faq.question.trim() !== "" && faq.answer.trim() !== ""),
        pricing: { newPrice: formData.newPrice, oldPrice: formData.oldPrice },
        galleryImages: galleryImagesIds,
        mainImage: mainImageId,
        isTrending: formData.isTrending
      });

      navigate("/admin/packages");
    } catch (error) {
      alert("Failed to create package. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-lg flex flex-col shadow-sm flex-1 min-h-0">
      <div className="p-4 border-b border-[#f3f4f6] flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/admin/packages" className="text-[#9ca3af] hover:text-[#f97316] transition-colors">
            <i className="ri-arrow-left-line text-lg"></i>
          </Link>
          <h2 className="text-[16px] font-bold text-[#111827] m-0">Create New Package</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-4 flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">Package Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleTextChange} required className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="e.g. Best of Switzerland" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">URL Slug *</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleTextChange} required className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="e.g. best-of-switzerland" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">Days *</label>
            <input type="number" name="days" value={formData.days} onChange={handleNumberChange} required min="1" className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">Nights *</label>
            <input type="number" name="nights" value={formData.nights} onChange={handleNumberChange} required min="1" className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">New Price (₹) *</label>
            <input type="number" name="newPrice" value={formData.newPrice} onChange={handleNumberChange} required min="0" className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">Old Price (₹) *</label>
            <input type="number" name="oldPrice" value={formData.oldPrice} onChange={handleNumberChange} required min="0" className="w-full px-3 py-2 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="isTrending" checked={formData.isTrending} onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })} className="w-4 h-4 accent-[#f97316]" />
          <label htmlFor="isTrending" className="text-[12px] font-semibold text-[#4b5563] cursor-pointer">Mark as Trending Package</label>
        </div>

        <div className="h-[1px] w-full bg-[#f3f4f6]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-[#4b5563]">Destination Route</label>
            {formData.route.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => handleArrayChange(idx, "route", e.target.value)} className="flex-1 px-3 py-1.5 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="e.g. Rome" />
                <button type="button" onClick={() => removeArrayItem(idx, "route")} className="px-2 text-red-500 hover:bg-red-50 rounded"><i className="ri-delete-bin-line"></i></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("route")} className="text-[11px] font-semibold text-[#f97316] self-start flex items-center gap-1 hover:underline"><i className="ri-add-line"></i> Add Route Stop</button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-[#4b5563]">Highlights</label>
            {formData.highlights.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => handleArrayChange(idx, "highlights", e.target.value)} className="flex-1 px-3 py-1.5 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="e.g. Mount Titlis Excursion" />
                <button type="button" onClick={() => removeArrayItem(idx, "highlights")} className="px-2 text-red-500 hover:bg-red-50 rounded"><i className="ri-delete-bin-line"></i></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("highlights")} className="text-[11px] font-semibold text-[#f97316] self-start flex items-center gap-1 hover:underline"><i className="ri-add-line"></i> Add Highlight</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-[#4b5563]">Inclusions</label>
            {formData.inclusions.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => handleArrayChange(idx, "inclusions", e.target.value)} className="flex-1 px-3 py-1.5 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="e.g. Daily Breakfast" />
                <button type="button" onClick={() => removeArrayItem(idx, "inclusions")} className="px-2 text-red-500 hover:bg-red-50 rounded"><i className="ri-delete-bin-line"></i></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("inclusions")} className="text-[11px] font-semibold text-[#f97316] self-start flex items-center gap-1 hover:underline"><i className="ri-add-line"></i> Add Inclusion</button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-semibold text-[#4b5563]">Exclusions</label>
            {formData.exclusions.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input type="text" value={item} onChange={(e) => handleArrayChange(idx, "exclusions", e.target.value)} className="flex-1 px-3 py-1.5 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="e.g. Flight Tickets" />
                <button type="button" onClick={() => removeArrayItem(idx, "exclusions")} className="px-2 text-red-500 hover:bg-red-50 rounded"><i className="ri-delete-bin-line"></i></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("exclusions")} className="text-[11px] font-semibold text-[#f97316] self-start flex items-center gap-1 hover:underline"><i className="ri-add-line"></i> Add Exclusion</button>
          </div>
        </div>

        <div className="h-[1px] w-full bg-[#f3f4f6]"></div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-semibold text-[#4b5563]">FAQs</label>
          {formData.faqs.map((faq, idx) => (
            <div key={idx} className="flex gap-2 items-start border border-[#e5e7eb] p-3 rounded bg-[#f9fafb]">
              <div className="flex-1 flex flex-col gap-2">
                <input type="text" value={faq.question} onChange={(e) => handleFaqChange(idx, "question", e.target.value)} className="w-full px-3 py-1.5 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316]" placeholder="Question" />
                <textarea value={faq.answer} onChange={(e) => handleFaqChange(idx, "answer", e.target.value)} className="w-full px-3 py-1.5 border border-[#e5e7eb] rounded focus:outline-none focus:border-[#f97316] min-h-[60px]" placeholder="Answer"></textarea>
              </div>
              <button type="button" onClick={() => removeFaq(idx)} className="px-2 py-1 text-red-500 hover:bg-red-50 rounded"><i className="ri-delete-bin-line"></i></button>
            </div>
          ))}
          <button type="button" onClick={addFaq} className="text-[11px] font-semibold text-[#f97316] self-start flex items-center gap-1 hover:underline"><i className="ri-add-line"></i> Add FAQ</button>
        </div>

        <div className="h-[1px] w-full bg-[#f3f4f6]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">Main Image *</label>
            <input type="file" accept="image/*" onChange={(e) => setMainImageFile(e.target.files[0])} required className="text-[11px]" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-[#4b5563]">Gallery Images</label>
            <input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(Array.from(e.target.files))} className="text-[11px]" />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isSubmitting} className="bg-[#f97316] text-white px-6 py-2 rounded font-bold hover:bg-[#ea580c] transition-colors disabled:opacity-50 flex items-center gap-2">
            {isSubmitting ? <><i className="ri-loader-4-line animate-spin"></i> Saving...</> : "Publish Package"}
          </button>
        </div>

      </form>
    </div>
  );
}