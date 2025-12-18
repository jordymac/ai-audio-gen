import { CategorizedMetadata } from "@/lib/extract-metadata";
import { TagBadge } from "./tag-badge";

interface MetadataExtractionColumnProps {
  metadata: CategorizedMetadata;
}

export function MetadataExtractionColumn({
  metadata,
}: MetadataExtractionColumnProps) {
  const renderTags = (tags: string[], isNegative: boolean = false) => {
    if (tags.length === 0) {
      return <p className="text-xs text-gray-400 italic">None specified</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <TagBadge key={`${tag}-${index}`} label={tag} variant={isNegative ? "negative" : "default"} />
        ))}
      </div>
    );
  };

  const hasNegativeTags =
    metadata.negativeGenreTags.length > 0 ||
    metadata.negativeMoodTags.length > 0 ||
    metadata.negativeInstrumentTags.length > 0 ||
    metadata.negativePerformanceTags.length > 0 ||
    metadata.negativeProductionTags.length > 0;

  return (
    <div className="space-y-6">
      {/* Positive Tags Section */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">Positive Tags</h3>
        <div className="space-y-4">
          {/* Genre Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Genre Tags</h4>
            {renderTags(metadata.genreTags)}
          </div>

          {/* Mood Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Mood Tags</h4>
            {renderTags(metadata.moodTags)}
          </div>

          {/* Instrument Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Instrument Tags</h4>
            {renderTags(metadata.instrumentTags)}
          </div>

          {/* Performance Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Performance Tags</h4>
            {renderTags(metadata.performanceTags)}
          </div>

          {/* Production Tags */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-2">Production Tags</h4>
            {renderTags(metadata.productionTags)}
          </div>
        </div>
      </div>

      {/* Negative Tags Section (Exclusions) */}
      {hasNegativeTags && (
        <div className="pt-4 border-t">
          <h3 className="text-base font-bold text-gray-900 mb-4">Negative Tags (Exclusions)</h3>
          <div className="space-y-4">
            {/* Negative Mood Tags */}
            {metadata.negativeMoodTags.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Avoid Mood</h4>
                {renderTags(metadata.negativeMoodTags, true)}
              </div>
            )}

            {/* Negative Instrument Tags */}
            {metadata.negativeInstrumentTags.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Avoid Instruments</h4>
                {renderTags(metadata.negativeInstrumentTags, true)}
              </div>
            )}

            {/* Negative Performance Tags */}
            {metadata.negativePerformanceTags.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Avoid Performance</h4>
                {renderTags(metadata.negativePerformanceTags, true)}
              </div>
            )}

            {/* Negative Production Tags */}
            {metadata.negativeProductionTags.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">Avoid Production</h4>
                {renderTags(metadata.negativeProductionTags, true)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Technical Details */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-bold text-gray-800 mb-2">Technical Details</h4>
        <div className="space-y-1.5 text-sm text-gray-700">
          {metadata.technicalDetails.bpm && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">BPM:</span>
              <span>{metadata.technicalDetails.bpm}</span>
            </div>
          )}
          {metadata.technicalDetails.key && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Key:</span>
              <span>{metadata.technicalDetails.key}</span>
            </div>
          )}
          {metadata.technicalDetails.timeSignature && (
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600">Time Signature:</span>
              <span>{metadata.technicalDetails.timeSignature}</span>
            </div>
          )}
          {!metadata.technicalDetails.bpm &&
            !metadata.technicalDetails.key &&
            !metadata.technicalDetails.timeSignature && (
              <p className="text-xs text-gray-400 italic">No technical details found</p>
            )}
        </div>
      </div>
    </div>
  );
}
