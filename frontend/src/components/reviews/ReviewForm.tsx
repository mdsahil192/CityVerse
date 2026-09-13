import { useState } from "react"
import { Star, Loader2 } from "lucide-react"
import { useAuth } from "../auth/AuthContext"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

interface ReviewFormProps {
  placeId: number
  onReviewSubmitted: (review: any) => void
  onCancel?: () => void
}

export default function ReviewForm({ placeId, onReviewSubmitted, onCancel }: ReviewFormProps) {
  const { session } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!session) {
    return (
      <div className="bg-muted/30 p-6 rounded-2xl text-center">
        <h3 className="text-lg font-bold mb-2">Sign in to review</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          You must be signed in to share your experience.
        </p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      setError("Please select a rating")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:8000/api/reviews/${placeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ rating, comment })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to submit review")
      }

      const newReview = await response.json()
      onReviewSubmitted(newReview)
      setRating(0)
      setComment("")
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-muted/20 p-6 rounded-2xl border">
      <div>
        <h4 className="font-semibold mb-1">Rate your experience</h4>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${(hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Write a review (optional)</h4>
        <Textarea
          placeholder="Share details of your own experience at this place..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="resize-none"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <div className="text-sm text-rose-500 bg-rose-500/10 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 justify-end pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </form>
  )
}
