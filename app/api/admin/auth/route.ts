import { NextRequest, NextResponse } from "next/server"

// Generic admin credentials
const ADMIN_USER = "admin"
const ADMIN_PASS = "admin07.."

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Create a simple session token
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")
      
      const response = NextResponse.json({ success: true })
      
      // Set HTTP-only cookie for session
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      })

      return response
    }

    return NextResponse.json(
      { error: "Credenciales incorrectas" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json(
      { error: "Error de autenticación" },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("admin_session")
  return response
}
