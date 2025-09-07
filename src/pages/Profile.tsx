"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function Profile() {
  const [editing, setEditing] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold mb-6">Perfil</h1>

      {/* Avatar */}
      <div className="w-32 h-32 rounded-full bg-gray-200 mb-6" />

      <Card className="w-full max-w-md">
        <CardContent className="space-y-4">
          {/* Nombres */}
          <div className="space-y-1">
            <Label htmlFor="firstName">Nombres</Label>
            <Input id="firstName" defaultValue="Julieta" disabled={!editing} />
          </div>

          {/* Apellidos */}
          <div className="space-y-1">
            <Label htmlFor="lastName">Apellidos</Label>
            <Input id="lastName" defaultValue="Arrieta" disabled={!editing} />
          </div>

          {/* Edad */}
          <div className="space-y-1">
            <Label htmlFor="age">Edad</Label>
            <Input id="age" defaultValue="28" disabled={!editing} />
          </div>

          {/* Correo */}
          <div className="space-y-1">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              defaultValue="julieta.arrieta@correounivalle.edu.co"
              type="email"
              disabled={!editing}
            />
          </div>

          {editing && (
            <div className="space-y-1">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                defaultValue="******"
                type="password"
                disabled={!editing}
              />
            </div>
          )}

          {/* Botón */}
          <div className="pt-4 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Guardar cambios" : "Editar perfil"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
