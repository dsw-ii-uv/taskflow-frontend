"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col md:flex-row shadow-lg">
        
        {/* Columna izquierda - Tabs con Login / Registro */}
        <div className="flex-[2] p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">TaskFlow</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Administra tus tareas de manera eficiente
          </p>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" placeholder="********" />
                </div>
                <Button className="w-full" type="submit">
                  Iniciar Sesión
                </Button>
              </form>
            </TabsContent>

            {/* Registro */}
            <TabsContent value="register">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" type="text" placeholder="Tu nombre" />
                </div>
                <div>
                  <Label htmlFor="reg-email">Correo electrónico</Label>
                  <Input id="reg-email" type="email" placeholder="tu@email.com" />
                </div>
                <div>
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input id="reg-password" type="password" placeholder="********" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <Button className="w-full" type="submit">
                  Registrarse
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Columna derecha - Imagen fija */}
        <div className="flex-[1] hidden md:flex bg-gray-100">
          <img
            src="/imagen.png"
            alt="Ilustración de inicio de sesión"
            className="w-full h-full object-cover"
          />
        </div>
      </Card>
  )
}
