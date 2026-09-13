import { Star } from "lucide-react"

interface ReviewBreakdownProps {
  reviews: any[]
}

export default function ReviewBreakdown({ reviews }: ReviewBreakdownProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-6 text-center text-muted-foreground border-b border-t mt-4 border-dashed">
        <Star className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2" />
        <p>No reviews yet. Be the first to review!</p>
      </div>
    )
  }

  const totalReviews = reviews.length
  const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews

  const counts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      counts[review.rating as keyof typeof counts]++
    }
  })

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center bg-muted/10 p-6 rounded-2xl border">
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="text-5xl font-bold text-foreground">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex items-center gap-1 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${star <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </div>
      </div>

      <div className="flex-1 w-full space-y-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = counts[star as keyof typeof counts]
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
          
          return (
            <div key={star} className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
              <div className="w-2">{star}</div>
              <Star className="h-4 w-4 shrink-0 fill-current" />
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-8 text-right tabular-nums">{count}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
