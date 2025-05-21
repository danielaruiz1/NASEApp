"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, CloudOff, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SyncStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(new Date())

  useEffect(() => {
    // Check online status
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("offline", handleOnlineStatus)

    return () => {
      window.removeEventListener("online", handleOnlineStatus)
      window.removeEventListener("offline", handleOnlineStatus)
    }
  }, [])

  const handleSync = () => {
    if (!isOnline) return

    setIsSyncing(true)

    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false)
      setLastSynced(new Date())
    }, 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleSync} disabled={isSyncing || !isOnline}>
            {isOnline ? (
              isSyncing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )
            ) : (
              <CloudOff className="h-4 w-4 text-amber-500" />
            )}
            {isOnline ? (isSyncing ? "Syncing..." : "Synced") : "Offline"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isOnline ? (
            isSyncing ? (
              "Syncing data with server..."
            ) : (
              <>Last synced: {lastSynced?.toLocaleTimeString()}</>
            )
          ) : (
            "Working offline. Changes will sync when connection is restored."
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
